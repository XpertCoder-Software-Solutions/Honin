<?php

namespace App\Http\Resources;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Project */
class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category' => $this->category->value,
            'category_label' => $this->category->label(),
            'title' => $this->title,
            'description' => $this->description,
            'image_url' => $this->imageUrl(),
            'is_featured' => $this->is_featured,
            'is_published' => $this->is_published,
            'sort_order' => $this->sort_order,
            'updated_at' => $this->updated_at,
        ];
    }
}
