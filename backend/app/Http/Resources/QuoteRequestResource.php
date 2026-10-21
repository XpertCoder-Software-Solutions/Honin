<?php

namespace App\Http\Resources;

use App\Models\QuoteRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin QuoteRequest */
class QuoteRequestResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'phone' => $this->phone,
            'service' => $this->service?->value,
            'service_label' => $this->service?->label(),
            'message' => $this->message,
            'status' => $this->status->value,
            'notes' => $this->notes,
            'handler' => $this->whenLoaded('handler', fn () => $this->handler ? ['id' => $this->handler->id, 'name' => $this->handler->name] : null),
            'contacted_at' => $this->contacted_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
