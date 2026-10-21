<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Resources\GalleryImageResource;
use App\Models\GalleryImage;

class GalleryImageController extends ContentController
{
    protected function model(): string
    {
        return GalleryImage::class;
    }

    protected function resource(): string
    {
        return GalleryImageResource::class;
    }

    protected function imageRequired(): bool
    {
        return true;
    }

    protected function rules(bool $creating): array
    {
        return [
            'category' => $this->categoryRule($creating),
            'caption' => ['nullable', 'string', 'max:160'],
            'sort_order' => ['sometimes', 'integer', 'min:0'],
        ];
    }
}
