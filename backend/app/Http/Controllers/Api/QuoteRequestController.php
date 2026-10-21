<?php

namespace App\Http\Controllers\Api;

use App\Enums\Category;
use App\Http\Controllers\Controller;
use App\Models\QuoteRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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

        QuoteRequest::create([...$data, 'ip_hash' => hash('sha256', $request->ip().config('app.key'))]);

        return response()->json(['message' => 'تم إرسال طلبك بنجاح، وسنتواصل معك قريبًا.'], 201);
    }
}
