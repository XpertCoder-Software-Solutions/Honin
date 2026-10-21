<?php

namespace App\Enums;

enum Role: string
{
    // Admins manage users and settings; editors manage content and requests.
    case Admin = 'admin';
    case Editor = 'editor';
}
