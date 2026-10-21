<?php

namespace App\Http\Resources;

use App\Models\HeroSlide;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin HeroSlide */
class HeroSlideResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category' => $this->category->value,
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'card_title' => $this->card_title,
            'card_description' => $this->card_description,
            'image_url' => $this->imageUrl(),
            'sort_order' => $this->sort_order,
            'is_active' => $this->is_active,
            'updated_at' => $this->updated_at,
        ];
    }
}
