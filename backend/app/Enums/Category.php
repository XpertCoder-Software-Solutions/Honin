<?php

namespace App\Enums;

enum Category: string
{
    case Construction = 'construction';
    case Landscaping = 'landscaping';
    case PestControl = 'pest-control';

    public function label(): string
    {
        return match ($this) {
            self::Construction => 'المقاولات والأعمال المساحية',
            self::Landscaping => 'الزراعة وتنسيق الحدائق',
            self::PestControl => 'مكافحة الحشرات والقوارض',
        };
    }
}
