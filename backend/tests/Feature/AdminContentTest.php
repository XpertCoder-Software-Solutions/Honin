<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\QuoteRequest;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminContentTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
    }

    public function test_editor_can_create_update_and_delete_project_with_image(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $id = $this->post('/api/admin/projects', [
            'category' => 'landscaping',
            'title' => 'حديقة جديدة',
            'image' => UploadedFile::fake()->image('garden.jpg', 800, 600),
        ], ['Accept' => 'application/json'])->assertCreated()->json('data.id');

        $project = Project::findOrFail($id);
        Storage::disk('public')->assertExists($project->image_path);
        $oldPath = $project->image_path;

        $this->post("/api/admin/projects/{$id}", [
            'title' => 'حديقة محدثة',
            'image' => UploadedFile::fake()->image('new.jpg'),
        ], ['Accept' => 'application/json'])->assertOk()->assertJsonPath('data.title', 'حديقة محدثة');

        Storage::disk('public')->assertMissing($oldPath);

        $this->deleteJson("/api/admin/projects/{$id}")->assertNoContent();
        $this->assertDatabaseCount('projects', 0);
        Storage::disk('public')->assertMissing($project->fresh()?->image_path ?? 'projects/x');
    }

    public function test_project_requires_image_and_valid_category(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $this->postJson('/api/admin/projects', ['category' => 'cooking', 'title' => 'x'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['category', 'image']);
    }

    public function test_reorder_sets_sort_order(): void
    {
        Sanctum::actingAs(User::factory()->create());
        $a = Project::create(['category' => 'construction', 'title' => 'A', 'sort_order' => 1]);
        $b = Project::create(['category' => 'construction', 'title' => 'B', 'sort_order' => 2]);

        $this->postJson('/api/admin/projects/reorder', ['ids' => [$b->id, $a->id]])->assertNoContent();

        $this->assertSame(1, $b->fresh()->sort_order);
        $this->assertSame(2, $a->fresh()->sort_order);
    }

    public function test_service_features_are_trimmed(): void
    {
        Sanctum::actingAs(User::factory()->create());
        $service = Service::create(['category' => 'construction', 'title' => 'x', 'features' => []]);

        $this->putJson("/api/admin/services/{$service->id}", ['features' => [' أ ', '', 'ب']])
            ->assertOk()
            ->assertJsonPath('data.features', ['أ', 'ب']);
    }

    public function test_updating_quote_status_records_handler(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $quote = QuoteRequest::create(['name' => 'x', 'phone' => '0551234567', 'message' => 'hello world!']);

        $this->putJson("/api/admin/quote-requests/{$quote->id}", ['status' => 'contacted', 'notes' => 'تم الاتصال'])
            ->assertOk()
            ->assertJsonPath('data.status', 'contacted')
            ->assertJsonPath('data.handler.id', $user->id);

        $this->assertNotNull($quote->fresh()->contacted_at);
    }

    public function test_quote_list_filters_by_status_and_returns_counts(): void
    {
        Sanctum::actingAs(User::factory()->create());
        QuoteRequest::create(['name' => 'a', 'phone' => '0551234567', 'message' => 'hello world!']);
        QuoteRequest::create(['name' => 'b', 'phone' => '0551234567', 'message' => 'hello world!', 'status' => 'closed']);

        $this->getJson('/api/admin/quote-requests?status=closed')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('counts.new', 1)
            ->assertJsonPath('counts.closed', 1);
    }

    public function test_stats_endpoint_returns_daily_series(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $this->getJson('/api/admin/stats?days=7')
            ->assertOk()
            ->assertJsonCount(7, 'daily')
            ->assertJsonStructure(['totals' => ['visits', 'visitors', 'quotes', 'quotes_new'], 'quotes_by_service', 'top_pages', 'recent_quotes']);
    }
}
