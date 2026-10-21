<?php

namespace App\Http\Controllers\Api\Admin;

use App\Enums\Category;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

/**
 * Shared CRUD for the ordered, image-backed content types
 * (hero slides, projects, gallery images, clients).
 */
abstract class ContentController extends Controller
{
    /** @return class-string<Model> */
    abstract protected function model(): string;

    /** @return class-string<JsonResource> */
    abstract protected function resource(): string;

    /** Validation rules for the non-image fields. */
    abstract protected function rules(bool $creating): array;

    /** Name of the column holding the stored image path. */
    protected function imageColumn(): string
    {
        return 'image_path';
    }

    protected function imageRequired(): bool
    {
        return false;
    }

    protected function storageFolder(): string
    {
        return (new ($this->model()))->getTable();
    }

    protected function query(Request $request): Builder
    {
        $query = $this->model()::query()->orderBy('sort_order')->orderByDesc('id');

        if ($request->filled('category')) {
            $query->where('category', $request->string('category'));
        }

        return $query;
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        return $this->resource()::collection($this->query($request)->get());
    }

    public function store(Request $request): JsonResource
    {
        $data = $this->validated($request, creating: true);
        $data['sort_order'] ??= ((int) $this->model()::query()->max('sort_order')) + 1;

        $model = $this->model()::create($data);

        return new ($this->resource())($model);
    }

    public function show(int $id): JsonResource
    {
        return new ($this->resource())($this->model()::findOrFail($id));
    }

    public function update(Request $request, int $id): JsonResource
    {
        $model = $this->model()::findOrFail($id);
        $model->update($this->validated($request, creating: false));

        return new ($this->resource())($model->refresh());
    }

    public function destroy(int $id): Response
    {
        $this->model()::findOrFail($id)->delete();

        return response()->noContent();
    }

    /** Persist a new order from a list of ids (first id = first position). */
    public function reorder(Request $request): Response
    {
        $table = (new ($this->model()))->getTable();
        $ids = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', Rule::exists($table, 'id')],
        ])['ids'];

        DB::transaction(function () use ($ids) {
            foreach (array_values($ids) as $position => $id) {
                $this->model()::whereKey($id)->update(['sort_order' => $position + 1]);
            }
        });

        return response()->noContent();
    }

    protected function validated(Request $request, bool $creating): array
    {
        $imageRule = [$creating && $this->imageRequired() ? 'required' : 'nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:8192'];

        $data = $request->validate([...$this->rules($creating), 'image' => $imageRule]);
        unset($data['image']);

        if ($request->hasFile('image')) {
            $data[$this->imageColumn()] = $request->file('image')->store($this->storageFolder(), 'public');
        }

        return $data;
    }

    protected function categoryRule(bool $creating): array
    {
        return [$creating ? 'required' : 'sometimes', Rule::enum(Category::class)];
    }
}
