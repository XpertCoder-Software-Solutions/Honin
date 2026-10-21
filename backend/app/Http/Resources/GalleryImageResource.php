<?php

namespace App\Http\Resources;

use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin GalleryImage */
class GalleryImageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category' => $this->category->value,
            'caption' => $this->caption,
            'image_url' => $this->imageUrl(),
            'sort_order' => $this->sort_order,
            'updated_at' => $this->updated_at,
        ];
    }
}
