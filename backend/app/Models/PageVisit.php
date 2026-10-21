<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageVisit extends Model
{
    public const UPDATED_AT = null;

    protected $fillable = ['path', 'referrer', 'device', 'visitor_hash', 'visited_on'];

    protected function casts(): array
    {
        return ['visited_on' => 'date'];
    }
}
