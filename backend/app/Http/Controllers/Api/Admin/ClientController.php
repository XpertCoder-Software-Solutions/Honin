<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Resources\ClientResource;
use App\Models\Client;

class ClientController extends ContentController
{
    protected function model(): string
    {
        return Client::class;
    }

    protected function resource(): string
    {
        return ClientResource::class;
    }

    protected function imageColumn(): string
    {
        return 'logo_path';
    }

    protected function imageRequired(): bool
    {
        return true;
    }

    protected function rules(bool $creating): array
    {
        return [
            'name' => [$creating ? 'required' : 'sometimes', 'string', 'max:120'],
            'website' => ['nullable', 'url', 'max:255'],
            'sort_order' => ['sometimes', 'integer', 'min:0'],
        ];
    }
}
