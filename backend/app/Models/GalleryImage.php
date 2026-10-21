<?php

namespace App\Models;

use App\Enums\Category;
use App\Models\Concerns\HasImage;
use Illuminate\Database\Eloquent\Model;

class GalleryImage extends Model
{
    use HasImage;

    protected $fillable = ['category', 'caption', 'image_path', 'sort_order'];

    protected function casts(): array
    {
        return ['category' => Category::class, 'sort_order' => 'integer'];
    }

    protected function imageColumn(): string
    {
        return 'image_path';
    }
}
