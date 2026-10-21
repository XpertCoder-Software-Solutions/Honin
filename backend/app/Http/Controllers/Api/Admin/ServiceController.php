<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ServiceController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return ServiceResource::collection(Service::query()->orderBy('sort_order')->get());
    }

    public function update(Request $request, Service $service): ServiceResource
    {
        $data = $request->validate([
            'title' => ['sometimes', 'string', 'max:120'],
            'description' => ['nullable', 'string', 'max:1000'],
            'features' => ['sometimes', 'array', 'max:20'],
            'features.*' => ['nullable', 'string', 'max:120'],
        ]);

        if (isset($data['features'])) {
            $data['features'] = array_values(array_filter(array_map(fn (?string $feature) => trim((string) $feature), $data['features'])));
        }

        $service->update($data);

        return new ServiceResource($service);
    }
}
