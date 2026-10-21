<?php

namespace App\Models;

use App\Enums\Category;
use App\Enums\QuoteStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuoteRequest extends Model
{
    protected $fillable = ['name', 'phone', 'service', 'message', 'status', 'notes', 'handled_by', 'contacted_at', 'ip_hash'];

    protected $hidden = ['ip_hash'];

    protected function casts(): array
    {
        return ['status' => QuoteStatus::class, 'service' => Category::class, 'contacted_at' => 'datetime'];
    }

    public function handler(): BelongsTo
    {
        return $this->belongsTo(User::class, 'handled_by');
    }
}
