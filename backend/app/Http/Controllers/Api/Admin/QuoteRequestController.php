<?php

namespace App\Http\Controllers\Api\Admin;

use App\Enums\Category;
use App\Enums\QuoteStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\QuoteRequestResource;
use App\Models\QuoteRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\StreamedResponse;

class QuoteRequestController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $filters = $request->validate([
            'status' => ['nullable', Rule::enum(QuoteStatus::class)],
            'service' => ['nullable', Rule::enum(Category::class)],
            'search' => ['nullable', 'string', 'max:100'],
            'per_page' => ['nullable', 'integer', 'min:5', 'max:100'],
        ]);

        $quotes = $this->filtered($filters)
            ->with('handler:id,name')
            ->latest()
            ->paginate($filters['per_page'] ?? 15)
            ->withQueryString();

        return QuoteRequestResource::collection($quotes)->additional([
            'counts' => QuoteRequest::query()
                ->selectRaw('status, count(*) as total')
                ->groupBy('status')
                ->pluck('total', 'status'),
        ]);
    }

    public function show(QuoteRequest $quoteRequest): QuoteRequestResource
    {
        return new QuoteRequestResource($quoteRequest->load('handler:id,name'));
    }

    public function update(Request $request, QuoteRequest $quoteRequest): QuoteRequestResource
    {
        $data = $request->validate([
            'status' => ['sometimes', Rule::enum(QuoteStatus::class)],
            'notes' => ['sometimes', 'nullable', 'string', 'max:2000'],
        ]);

        if (isset($data['status']) && $data['status'] !== QuoteStatus::New->value) {
            $data['handled_by'] = $request->user()->id;
            $data['contacted_at'] = $quoteRequest->contacted_at ?? now();
        }

        $quoteRequest->update($data);

        return new QuoteRequestResource($quoteRequest->refresh()->load('handler:id,name'));
    }

    public function destroy(QuoteRequest $quoteRequest): Response
    {
        $quoteRequest->delete();

        return response()->noContent();
    }

    public function export(Request $request): StreamedResponse
    {
        $filters = $request->validate([
            'status' => ['nullable', Rule::enum(QuoteStatus::class)],
            'service' => ['nullable', Rule::enum(Category::class)],
            'search' => ['nullable', 'string', 'max:100'],
        ]);

        $rows = $this->filtered($filters)->latest()->get();

        return response()->streamDownload(function () use ($rows) {
            $out = fopen('php://output', 'w');
            fwrite($out, "\xEF\xBB\xBF"); // UTF-8 BOM so Excel shows Arabic correctly
            fputcsv($out, ['#', 'الاسم', 'الهاتف', 'الخدمة', 'الرسالة', 'الحالة', 'ملاحظات', 'التاريخ']);
            foreach ($rows as $row) {
                fputcsv($out, [
                    $row->id, $row->name, $row->phone, $row->service?->label(), $row->message,
                    $row->status->value, $row->notes, $row->created_at->format('Y-m-d H:i'),
                ]);
            }
            fclose($out);
        }, 'quote-requests-'.now()->format('Y-m-d').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    private function filtered(array $filters)
    {
        return QuoteRequest::query()
            ->when($filters['status'] ?? null, fn ($q, $status) => $q->where('status', $status))
            ->when($filters['service'] ?? null, fn ($q, $service) => $q->where('service', $service))
            ->when($filters['search'] ?? null, function ($q, $search) {
                $q->where(fn ($q) => $q->where('name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('message', 'like', "%{$search}%"));
            });
    }
}
