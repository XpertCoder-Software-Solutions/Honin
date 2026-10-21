<?php

namespace App\Models;

use App\Enums\Category;
use App\Models\Concerns\HasImage;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasImage;

    protected $fillable = ['category', 'title', 'description', 'image_path', 'is_featured', 'is_published', 'sort_order'];

    protected function casts(): array
    {
        return ['category' => Category::class, 'is_featured' => 'boolean', 'is_published' => 'boolean', 'sort_order' => 'integer'];
    }

    protected function imageColumn(): string
    {
        return 'image_path';
    }
}
