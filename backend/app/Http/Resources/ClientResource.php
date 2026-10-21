<?php

namespace App\Http\Resources;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Client */
class ClientResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'website' => $this->website,
            'logo_url' => $this->imageUrl(),
            'sort_order' => $this->sort_order,
            'updated_at' => $this->updated_at,
        ];
    }
}
