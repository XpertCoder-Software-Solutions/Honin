<?php

namespace Database\Seeders;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $email = env('ADMIN_EMAIL', 'admin@honain.sa');
        $password = env('ADMIN_PASSWORD') ?: Str::password(14, symbols: false);

        $admin = User::firstOrCreate(['email' => $email], [
            'name' => 'مدير النظام',
            'password' => $password,
            'role' => Role::Admin,
        ]);

        if ($admin->wasRecentlyCreated) {
            $this->command?->warn("Admin account: {$email} / {$password}  (change it after first login)");
        }

        $this->call(SiteContentSeeder::class);
    }
}
