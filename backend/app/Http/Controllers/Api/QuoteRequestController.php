<?php

namespace App\Http\Controllers\Api;

use App\Enums\Category;
use App\Http\Controllers\Controller;
use App\Mail\NewQuoteRequest;
use App\Models\QuoteRequest;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;

class QuoteRequestController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'min:3', 'max:120'],
            'phone' => ['required', 'regex:/^05\d{8}$/'],
            'service' => ['nullable', Rule::enum(Category::class)],
            'message' => ['required', 'string', 'min:10', 'max:2000'],
            'website' => ['prohibited'], // honeypot: real visitors never fill this hidden field
        ], [
            'phone.regex' => 'أدخل رقمًا سعوديًا صحيحًا بصيغة 05xxxxxxxx.',
        ]);

        $quote = QuoteRequest::create([...$data, 'ip_hash' => hash('sha256', $request->ip().config('app.key'))]);

        $this->notifyTeam($quote);

        return response()->json(['message' => 'تم إرسال طلبك بنجاح، وسنتواصل معك قريبًا.'], 201);
    }

    /** Email the team when a notification address is set. A mail failure must never lose the request. */
    private function notifyTeam(QuoteRequest $quote): void
    {
        $email = Setting::find('notify_email')?->value;

        if (! $email) {
            return;
        }

        try {
            Mail::to($email)->send(new NewQuoteRequest($quote));
        } catch (\Throwable $exception) {
            Log::warning('Quote request notification failed', ['quote' => $quote->id, 'error' => $exception->getMessage()]);
        }
    }
}
