<?php

namespace App\Http\Controllers\Api\Admin;

use App\Enums\QuoteStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\QuoteRequestResource;
use App\Models\GalleryImage;
use App\Models\PageVisit;
use App\Models\Project;
use App\Models\QuoteRequest;
use Carbon\CarbonPeriod;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $days = (int) $request->validate(['days' => ['nullable', 'integer', 'in:7,30,90']])['days'] ?: 30;
        $from = today()->subDays($days - 1);
        $previousFrom = $from->copy()->subDays($days);

        $visits = PageVisit::query()->where('visited_on', '>=', $from);
        $previousVisits = PageVisit::query()->whereBetween('visited_on', [$previousFrom, $from->copy()->subDay()]);
        $quotes = QuoteRequest::query()->where('created_at', '>=', $from);
        $previousQuotes = QuoteRequest::query()->whereBetween('created_at', [$previousFrom, $from]);

        return response()->json([
            'range' => ['days' => $days, 'from' => $from->toDateString(), 'to' => today()->toDateString()],
            'totals' => [
                'visits' => (clone $visits)->count(),
                'visits_previous' => $previousVisits->count(),
                'visitors' => (clone $visits)->distinct('visitor_hash')->count('visitor_hash'),
                'quotes' => (clone $quotes)->count(),
                'quotes_previous' => $previousQuotes->count(),
                'quotes_new' => QuoteRequest::where('status', QuoteStatus::New)->count(),
                'projects' => Project::count(),
                'gallery_images' => GalleryImage::count(),
            ],
            'daily' => $this->daily($from, $visits, $quotes),
            'quotes_by_service' => (clone $quotes)->selectRaw('service, count(*) as total')->groupBy('service')->pluck('total', 'service'),
            'quotes_by_status' => QuoteRequest::query()->selectRaw('status, count(*) as total')->groupBy('status')->pluck('total', 'status'),
            'top_pages' => (clone $visits)->selectRaw('path, count(*) as total')->groupBy('path')->orderByDesc('total')->limit(6)->get(),
            'devices' => (clone $visits)->selectRaw('device, count(*) as total')->groupBy('device')->pluck('total', 'device'),
            'recent_quotes' => QuoteRequestResource::collection(QuoteRequest::query()->latest()->limit(5)->get()),
        ]);
    }

    /** One row per day in the range, zero-filled, with visits, unique visitors and quote requests. */
    private function daily(Carbon $from, $visits, $quotes): array
    {
        $visitRows = (clone $visits)
            ->selectRaw('visited_on as day, count(*) as visits, count(distinct visitor_hash) as visitors')
            ->groupBy('visited_on')->get()
            ->keyBy(fn ($row) => Carbon::parse($row->day)->toDateString());

        $quoteRows = (clone $quotes)
            ->selectRaw('date(created_at) as day, count(*) as total')
            ->groupByRaw('date(created_at)')
            ->pluck('total', 'day');

        return collect(CarbonPeriod::create($from, today()))->map(function (Carbon $day) use ($visitRows, $quoteRows) {
            $key = $day->toDateString();

            return [
                'date' => $key,
                'visits' => (int) ($visitRows[$key]->visits ?? 0),
                'visitors' => (int) ($visitRows[$key]->visitors ?? 0),
                'quotes' => (int) ($quoteRows[$key] ?? 0),
            ];
        })->all();
    }
}
