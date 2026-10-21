<?php

namespace App\Models;

use App\Enums\Category;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = ['category', 'title', 'description', 'features', 'sort_order'];

    protected function casts(): array
    {
        return ['category' => Category::class, 'features' => 'array', 'sort_order' => 'integer'];
    }
}
