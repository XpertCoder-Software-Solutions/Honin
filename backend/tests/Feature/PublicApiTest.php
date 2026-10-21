<?php

namespace Tests\Feature;

use App\Models\PageVisit;
use App\Models\Project;
use App\Models\QuoteRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_site_returns_only_published_projects(): void
    {
        Project::create(['category' => 'construction', 'title' => 'Visible', 'is_published' => true]);
        Project::create(['category' => 'construction', 'title' => 'Hidden', 'is_published' => false]);

        $this->getJson('/api/site')
            ->assertOk()
            ->assertJsonCount(1, 'projects')
            ->assertJsonPath('projects.0.title', 'Visible');
    }

    public function test_quote_request_is_stored(): void
    {
        $this->postJson('/api/quote-requests', [
            'name' => 'محمد أحمد',
            'phone' => '0551234567',
            'service' => 'landscaping',
            'message' => 'أرغب في تنسيق حديقة منزلية',
        ])->assertCreated();

        $quote = QuoteRequest::sole();
        $this->assertSame('new', $quote->status->value);
        $this->assertNotNull($quote->ip_hash);
    }

    public function test_quote_request_validates_saudi_phone(): void
    {
        $this->postJson('/api/quote-requests', [
            'name' => 'محمد', 'phone' => '12345', 'message' => 'رسالة طويلة بما يكفي',
        ])->assertUnprocessable()->assertJsonValidationErrors('phone');
    }

    public function test_quote_request_requires_a_service(): void
    {
        $this->postJson('/api/quote-requests', [
            'name' => 'محمد أحمد', 'phone' => '0551234567', 'message' => 'رسالة طويلة بما يكفي',
        ])->assertUnprocessable()->assertJsonValidationErrors('service');

        $this->postJson('/api/quote-requests', [
            'name' => 'محمد أحمد', 'phone' => '0551234567', 'service' => 'cooking', 'message' => 'رسالة طويلة بما يكفي',
        ])->assertUnprocessable()->assertJsonValidationErrors('service');
    }

    public function test_honeypot_blocks_bots(): void
    {
        $this->postJson('/api/quote-requests', [
            'name' => 'Bot', 'phone' => '0551234567', 'service' => 'construction', 'message' => 'spam spam spam', 'website' => 'http://spam.test',
        ])->assertUnprocessable();

        $this->assertDatabaseCount('quote_requests', 0);
    }

    public function test_visit_is_recorded_and_bots_are_ignored(): void
    {
        $this->postJson('/api/visits', ['path' => '/works'], ['User-Agent' => 'Mozilla/5.0 (iPhone)'])->assertNoContent();
        $this->postJson('/api/visits', ['path' => '/'], ['User-Agent' => 'Googlebot/2.1'])->assertNoContent();

        $visit = PageVisit::sole();
        $this->assertSame('/works', $visit->path);
        $this->assertSame('mobile', $visit->device);
    }
}
