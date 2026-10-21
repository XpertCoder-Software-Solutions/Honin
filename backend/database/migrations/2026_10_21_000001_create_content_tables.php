<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Service categories are fixed: construction, landscaping, pest-control.

        Schema::create('hero_slides', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->string('card_title');
            $table->string('card_description')->nullable();
            $table->string('image_path')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('category')->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->json('features')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('category')->index();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('image_path')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('gallery_images', function (Blueprint $table) {
            $table->id();
            $table->string('category')->index();
            $table->string('caption')->nullable();
            $table->string('image_path');
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('logo_path')->nullable();
            $table->string('website')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('settings', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->json('value')->nullable();
            $table->timestamps();
        });

        Schema::create('quote_requests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone', 20);
            $table->string('service')->nullable();
            $table->text('message');
            $table->string('status')->default('new')->index();
            $table->text('notes')->nullable();
            $table->foreignId('handled_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('contacted_at')->nullable();
            $table->string('ip_hash', 64)->nullable();
            $table->timestamps();
        });

        Schema::create('page_visits', function (Blueprint $table) {
            $table->id();
            $table->string('path')->index();
            $table->string('referrer')->nullable();
            $table->string('device', 16)->nullable();
            $table->string('visitor_hash', 64)->index();
            $table->date('visited_on')->index();
            $table->timestamp('created_at')->nullable();
        });
    }

    public function down(): void
    {
        foreach (['page_visits', 'quote_requests', 'settings', 'clients', 'gallery_images', 'projects', 'services', 'hero_slides'] as $table) {
            Schema::dropIfExists($table);
        }
    }
};
