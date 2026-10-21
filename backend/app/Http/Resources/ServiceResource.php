<?php

namespace App\Http\Resources;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Service */
class ServiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category' => $this->category->value,
            'title' => $this->title,
            'description' => $this->description,
            'features' => $this->features ?? [],
            'sort_order' => $this->sort_order,
            'updated_at' => $this->updated_at,
        ];
    }
}
