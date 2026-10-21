<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminUsersTest extends TestCase
{
    use RefreshDatabase;

    public function test_editor_cannot_manage_users_or_settings(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $this->getJson('/api/admin/users')->assertForbidden();
        $this->putJson('/api/admin/settings', ['email' => 'x@y.com'])->assertForbidden();
    }

    public function test_admin_can_create_and_deactivate_users(): void
    {
        Sanctum::actingAs(User::factory()->admin()->create());

        $id = $this->postJson('/api/admin/users', [
            'name' => 'محرر', 'email' => 'editor@honain.sa', 'password' => 'password123', 'role' => 'editor',
        ])->assertCreated()->json('data.id');

        $this->putJson("/api/admin/users/{$id}", ['is_active' => false])->assertOk()->assertJsonPath('data.is_active', false);
    }

    public function test_admin_cannot_demote_or_delete_self(): void
    {
        $admin = User::factory()->admin()->create();
        Sanctum::actingAs($admin);

        $this->putJson("/api/admin/users/{$admin->id}", ['role' => 'editor'])->assertUnprocessable();
        $this->deleteJson("/api/admin/users/{$admin->id}")->assertUnprocessable();
    }

    public function test_admin_can_update_settings(): void
    {
        Sanctum::actingAs(User::factory()->admin()->create());

        $this->putJson('/api/admin/settings', [
            'phones' => [['label' => 'قسم الزراعة', 'number' => '0500000000']],
            'stats' => ['years' => 41, 'projects' => 510, 'clients' => 320],
        ])->assertOk()->assertJsonPath('data.stats.years', 41);

        $this->getJson('/api/site')->assertJsonPath('settings.phones.0.number', '0500000000');
    }
}
