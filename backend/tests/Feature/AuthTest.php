<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_returns_token_and_updates_last_login(): void
    {
        $user = User::factory()->create(['password' => 'secret-pass']);

        $response = $this->postJson('/api/auth/login', ['email' => $user->email, 'password' => 'secret-pass']);

        $response->assertOk()->assertJsonStructure(['token', 'user' => ['id', 'name', 'role']]);
        $this->assertNotNull($user->fresh()->last_login_at);

        $this->withToken($response->json('token'))->getJson('/api/auth/me')->assertOk()->assertJsonPath('data.email', $user->email);
    }

    public function test_wrong_password_is_rejected(): void
    {
        $user = User::factory()->create(['password' => 'secret-pass']);

        $this->postJson('/api/auth/login', ['email' => $user->email, 'password' => 'nope'])->assertUnprocessable()->assertJsonValidationErrors('email');
    }

    public function test_inactive_user_cannot_log_in_or_use_existing_token(): void
    {
        $user = User::factory()->create(['password' => 'secret-pass']);
        $token = $user->createToken('t')->plainTextToken;
        $user->update(['is_active' => false]);

        $this->postJson('/api/auth/login', ['email' => $user->email, 'password' => 'secret-pass'])->assertUnprocessable();
        $this->withToken($token)->getJson('/api/auth/me')->assertUnauthorized();
    }

    public function test_logout_revokes_token(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('t')->plainTextToken;

        $this->withToken($token)->postJson('/api/auth/logout')->assertNoContent();
        $this->assertDatabaseCount('personal_access_tokens', 0);
    }

    public function test_admin_routes_require_authentication(): void
    {
        $this->getJson('/api/admin/stats')->assertUnauthorized();
    }
}
