<?php

namespace App\Enums;

enum QuoteStatus: string
{
    case New = 'new';
    case Contacted = 'contacted';
    case InProgress = 'in_progress';
    case Closed = 'closed';
    case Spam = 'spam';
}
