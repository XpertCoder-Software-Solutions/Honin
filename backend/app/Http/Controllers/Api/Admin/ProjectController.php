<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Resources\ProjectResource;
use App\Models\Project;

class ProjectController extends ContentController
{
    protected function model(): string
    {
        return Project::class;
    }

    protected function resource(): string
    {
        return ProjectResource::class;
    }

    protected function imageRequired(): bool
    {
        return true;
    }

    protected function rules(bool $creating): array
    {
        return [
            'category' => $this->categoryRule($creating),
            'title' => [$creating ? 'required' : 'sometimes', 'string', 'max:160'],
            'description' => ['nullable', 'string', 'max:1000'],
            'is_featured' => ['sometimes', 'boolean'],
            'is_published' => ['sometimes', 'boolean'],
            'sort_order' => ['sometimes', 'integer', 'min:0'],
        ];
    }
}
