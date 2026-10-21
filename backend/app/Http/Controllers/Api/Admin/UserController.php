<?php

namespace App\Http\Controllers\Api\Admin;

use App\Enums\Role;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return UserResource::collection(User::query()->orderBy('name')->get());
    }

    public function store(Request $request): UserResource
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:120', 'unique:users,email'],
            'password' => ['required', Password::min(8)],
            'role' => ['required', Rule::enum(Role::class)],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        return new UserResource(User::create($data));
    }

    public function update(Request $request, User $user): UserResource
    {
        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:120'],
            'email' => ['sometimes', 'email', 'max:120', Rule::unique('users', 'email')->ignore($user->id)],
            'password' => ['sometimes', 'nullable', Password::min(8)],
            'role' => ['sometimes', Rule::enum(Role::class)],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        if (empty($data['password'])) {
            unset($data['password']);
        }

        $this->guardSelf($request, $user, $data);
        $user->update($data);

        if (($data['is_active'] ?? true) === false || isset($data['password'])) {
            $user->tokens()->delete();
        }

        return new UserResource($user);
    }

    public function destroy(Request $request, User $user): Response
    {
        if ($request->user()->is($user)) {
            throw ValidationException::withMessages(['user' => 'لا يمكنك حذف حسابك الحالي.']);
        }

        $user->tokens()->delete();
        $user->delete();

        return response()->noContent();
    }

    /** Admins cannot lock themselves out by demoting or deactivating their own account. */
    private function guardSelf(Request $request, User $user, array $data): void
    {
        if (! $request->user()->is($user)) {
            return;
        }

        if (($data['role'] ?? Role::Admin->value) !== Role::Admin->value || ($data['is_active'] ?? true) === false) {
            throw ValidationException::withMessages(['role' => 'لا يمكنك تغيير صلاحية حسابك الحالي أو إيقافه.']);
        }
    }
}
