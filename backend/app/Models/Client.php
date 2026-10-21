<?php

namespace App\Models;

use App\Models\Concerns\HasImage;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasImage;

    protected $fillable = ['name', 'logo_path', 'website', 'sort_order'];

    protected function casts(): array
    {
        return ['sort_order' => 'integer'];
    }

    protected function imageColumn(): string
    {
        return 'logo_path';
    }
}
