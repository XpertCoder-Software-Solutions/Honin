<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageVisit;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class VisitController extends Controller
{
    private const BOT_PATTERN = '/bot|crawl|spider|slurp|headless|lighthouse|preview/i';

    public function store(Request $request): Response
    {
        $data = $request->validate([
            'path' => ['required', 'string', 'max:120'],
            'referrer' => ['nullable', 'string', 'max:255'],
        ]);

        $agent = (string) $request->userAgent();

        if (! preg_match(self::BOT_PATTERN, $agent)) {
            PageVisit::create([
                'path' => Str::start($data['path'], '/'),
                'referrer' => $this->referrerHost($data['referrer'] ?? null),
                'device' => preg_match('/mobile|android|iphone/i', $agent) ? 'mobile' : (preg_match('/ipad|tablet/i', $agent) ? 'tablet' : 'desktop'),
                // Daily salted hash: counts unique visitors without storing IPs.
                'visitor_hash' => hash('sha256', $request->ip().$agent.today()->toDateString().config('app.key')),
                'visited_on' => today(),
            ]);
        }

        return response()->noContent();
    }

    private function referrerHost(?string $referrer): ?string
    {
        $host = $referrer ? parse_url($referrer, PHP_URL_HOST) : null;

        return $host ? Str::limit($host, 120, '') : null;
    }
}
