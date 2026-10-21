<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientResource;
use App\Http\Resources\GalleryImageResource;
use App\Http\Resources\HeroSlideResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\ServiceResource;
use App\Models\Client;
use App\Models\GalleryImage;
use App\Models\HeroSlide;
use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Arr;

/** Everything the public website renders, in one cacheable request. */
class SiteController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $settings = Arr::except(Setting::allAsArray(), ['notify_email']);

        return response()->json([
            'hero_slides' => HeroSlideResource::collection(HeroSlide::where('is_active', true)->orderBy('sort_order')->get()),
            'services' => ServiceResource::collection(Service::orderBy('sort_order')->get()),
            'projects' => ProjectResource::collection(Project::where('is_published', true)->orderBy('sort_order')->get()),
            'gallery' => GalleryImageResource::collection(GalleryImage::orderBy('sort_order')->get()),
            'clients' => ClientResource::collection(Client::orderBy('sort_order')->get()),
            'settings' => (object) $settings,
        ]);
    }
}
