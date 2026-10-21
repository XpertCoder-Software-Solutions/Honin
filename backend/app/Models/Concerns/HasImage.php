<?php

namespace App\Models\Concerns;

use Illuminate\Support\Facades\Storage;

/**
 * Exposes `{column}_url` for a stored image path and removes the file
 * when the model is deleted or the image is replaced.
 */
trait HasImage
{
    abstract protected function imageColumn(): string;

    public static function bootHasImage(): void
    {
        static::deleted(function ($model) {
            $model->deleteStoredImage($model->{$model->imageColumn()});
        });

        static::updating(function ($model) {
            $column = $model->imageColumn();
            if ($model->isDirty($column)) {
                $model->deleteStoredImage($model->getOriginal($column));
            }
        });
    }

    public function imageUrl(): ?string
    {
        $path = $this->{$this->imageColumn()};

        return $path ? Storage::disk('public')->url($path) : null;
    }

    protected function deleteStoredImage(?string $path): void
    {
        if ($path && ! str_starts_with($path, 'seed/')) {
            Storage::disk('public')->delete($path);
        }
    }
}
