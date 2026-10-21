<?php

use App\Http\Controllers\Api\Admin;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\QuoteRequestController;
use App\Http\Controllers\Api\SiteController;
use App\Http\Controllers\Api\VisitController;
use Illuminate\Support\Facades\Route;

// Public website
Route::get('site', SiteController::class);
Route::post('quote-requests', [QuoteRequestController::class, 'store'])->middleware('throttle:quotes');
Route::post('visits', [VisitController::class, 'store'])->middleware('throttle:visits');

// Dashboard auth
Route::post('auth/login', [AuthController::class, 'login'])->middleware('throttle:login');

Route::middleware(['auth:sanctum', 'active'])->group(function () {
    Route::get('auth/me', [AuthController::class, 'me']);
    Route::put('auth/me', [AuthController::class, 'updateProfile']);
    Route::post('auth/logout', [AuthController::class, 'logout']);

    Route::prefix('admin')->group(function () {
        Route::get('stats', Admin\DashboardController::class);

        Route::get('quote-requests/export', [Admin\QuoteRequestController::class, 'export']);
        Route::apiResource('quote-requests', Admin\QuoteRequestController::class)->except('store');

        foreach ([
            'hero-slides' => Admin\HeroSlideController::class,
            'projects' => Admin\ProjectController::class,
            'gallery-images' => Admin\GalleryImageController::class,
            'clients' => Admin\ClientController::class,
        ] as $uri => $controller) {
            Route::post("{$uri}/reorder", [$controller, 'reorder']);
            // Multipart updates use POST because PHP does not parse file uploads on PUT.
            Route::post("{$uri}/{id}", [$controller, 'update'])->whereNumber('id');
            Route::apiResource($uri, $controller)->parameters([$uri => 'id']);
        }

        Route::get('services', [Admin\ServiceController::class, 'index']);
        Route::put('services/{service}', [Admin\ServiceController::class, 'update']);

        Route::middleware('admin')->group(function () {
            Route::get('settings', [Admin\SettingController::class, 'show']);
            Route::put('settings', [Admin\SettingController::class, 'update']);
            Route::apiResource('users', Admin\UserController::class)->except('show');
        });
    });
});
