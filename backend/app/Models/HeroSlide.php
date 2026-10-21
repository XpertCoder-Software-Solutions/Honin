<?php

namespace App\Models;

use App\Enums\Category;
use App\Models\Concerns\HasImage;
use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    use HasImage;

    protected $fillable = ['category', 'title', 'subtitle', 'card_title', 'card_description', 'image_path', 'sort_order', 'is_active'];

    protected function casts(): array
    {
        return ['category' => Category::class, 'is_active' => 'boolean', 'sort_order' => 'integer'];
    }

    protected function imageColumn(): string
    {
        return 'image_path';
    }
}
