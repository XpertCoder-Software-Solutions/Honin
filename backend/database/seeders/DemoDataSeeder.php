<?php

namespace Database\Seeders;

use App\Models\PageVisit;
use App\Models\QuoteRequest;
use Illuminate\Database\Seeder;

/**
 * Fake visits and quote requests for trying the dashboard locally.
 * Not part of DatabaseSeeder: run with `php artisan db:seed --class=DemoDataSeeder`.
 */
class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        $paths = ['/' => 70, '/works' => 18, '/gallery' => 12];
        $devices = ['mobile' => 62, 'desktop' => 33, 'tablet' => 5];

        foreach (range(89, 0) as $daysAgo) {
            $day = today()->subDays($daysAgo);
            $count = (int) round((40 + 25 * sin($daysAgo / 6)) * (in_array($day->dayOfWeek, [5, 6]) ? 0.7 : 1)) + random_int(0, 15);

            $rows = [];
            for ($i = 0; $i < $count; $i++) {
                $rows[] = [
                    'path' => $this->weighted($paths),
                    'device' => $this->weighted($devices),
                    'referrer' => random_int(0, 3) ? null : 'google.com',
                    'visitor_hash' => hash('sha256', $day->toDateString().random_int(1, (int) ($count * 0.7))),
                    'visited_on' => $day->toDateString(),
                    'created_at' => $day->copy()->addMinutes(random_int(0, 1439)),
                ];
            }
            PageVisit::insert($rows);
        }

        $names = ['عبدالله الشهري', 'محمد القحطاني', 'سارة العتيبي', 'فهد الدوسري', 'نورة الحربي', 'خالد الزهراني', 'ريم المطيري', 'سلطان الغامدي'];
        $messages = [
            'construction' => 'نرغب في عرض سعر لأعمال رفع مساحي لأرض في شمال الرياض بمساحة 2000 متر.',
            'landscaping' => 'أرغب في تصميم وتنفيذ حديقة منزلية مع شبكة ري وتركيب نجيل طبيعي.',
            'pest-control' => 'نحتاج مكافحة دورية للحشرات والقوارض لمستودع في المنطقة الصناعية.',
        ];
        $statuses = ['new' => 30, 'contacted' => 30, 'in_progress' => 15, 'closed' => 22, 'spam' => 3];

        foreach (range(1, 46) as $i) {
            $service = array_rand($messages);
            $created = now()->subDays(random_int(0, 89))->subMinutes(random_int(0, 1400));
            QuoteRequest::create([
                'name' => $names[array_rand($names)],
                'phone' => '05'.random_int(10000000, 99999999),
                'service' => $service,
                'message' => $messages[$service],
                'status' => $created->gt(now()->subDays(3)) ? 'new' : $this->weighted($statuses),
            ])->forceFill(['created_at' => $created, 'updated_at' => $created])->save();
        }
    }

    private function weighted(array $weights): string
    {
        $pick = random_int(1, array_sum($weights));
        foreach ($weights as $value => $weight) {
            if (($pick -= $weight) <= 0) {
                return $value;
            }
        }

        return array_key_first($weights);
    }
}
