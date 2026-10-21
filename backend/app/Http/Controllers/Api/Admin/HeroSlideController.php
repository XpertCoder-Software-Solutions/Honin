<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Resources\HeroSlideResource;
use App\Models\HeroSlide;

class HeroSlideController extends ContentController
{
    protected function model(): string
    {
        return HeroSlide::class;
    }

    protected function resource(): string
    {
        return HeroSlideResource::class;
    }

    protected function imageRequired(): bool
    {
        return true;
    }

    protected function rules(bool $creating): array
    {
        $required = $creating ? 'required' : 'sometimes';

        return [
            'category' => $this->categoryRule($creating),
            'title' => [$required, 'string', 'max:120'],
            'subtitle' => ['nullable', 'string', 'max:200'],
            'card_title' => [$required, 'string', 'max:120'],
            'card_description' => ['nullable', 'string', 'max:200'],
            'sort_order' => ['sometimes', 'integer', 'min:0'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}
