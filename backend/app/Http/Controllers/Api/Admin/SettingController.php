<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SettingController extends Controller
{
    public const RULES = [
        'phones' => ['sometimes', 'array', 'max:6'],
        'phones.*.label' => ['required', 'string', 'max:60'],
        'phones.*.number' => ['required', 'string', 'max:20'],
        'email' => ['sometimes', 'nullable', 'email', 'max:120'],
        'address' => ['sometimes', 'nullable', 'string', 'max:200'],
        'working_hours' => ['sometimes', 'array', 'max:6'],
        'working_hours.*' => ['string', 'max:120'],
        'emergency_note' => ['sometimes', 'nullable', 'string', 'max:120'],
        'tax_number' => ['sometimes', 'nullable', 'string', 'max:30'],
        'commercial_register' => ['sometimes', 'nullable', 'string', 'max:30'],
        'social' => ['sometimes', 'array'],
        'social.facebook' => ['nullable', 'url'],
        'social.twitter' => ['nullable', 'url'],
        'social.instagram' => ['nullable', 'url'],
        'social.linkedin' => ['nullable', 'url'],
        'stats' => ['sometimes', 'array'],
        'stats.years' => ['integer', 'min:0'],
        'stats.projects' => ['integer', 'min:0'],
        'stats.clients' => ['integer', 'min:0'],
    ];

    public function show(): JsonResponse
    {
        return response()->json(['data' => Setting::allAsArray()]);
    }

    public function update(Request $request): JsonResponse
    {
        $data = $request->validate(self::RULES);

        DB::transaction(function () use ($data) {
            foreach ($data as $key => $value) {
                Setting::updateOrCreate(['key' => $key], ['value' => $value]);
            }
        });

        return $this->show();
    }
}
