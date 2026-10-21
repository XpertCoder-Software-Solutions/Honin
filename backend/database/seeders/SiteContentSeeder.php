<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\GalleryImage;
use App\Models\HeroSlide;
use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

/**
 * Loads the content currently hard-coded in the React site so the dashboard
 * starts from what visitors already see. Images are copied from ../src/assets.
 */
class SiteContentSeeder extends Seeder
{
    private string $assets;

    public function run(): void
    {
        $this->assets = base_path('../src/assets');

        $this->heroSlides();
        $this->services();
        $this->projects();
        $this->gallery();
        $this->clients();
        $this->settings();
    }

    /** Copy a frontend asset into public storage and return its stored path. */
    private function image(string $relative): ?string
    {
        $source = "{$this->assets}/{$relative}";
        if (! File::exists($source)) {
            return null;
        }

        $path = 'seed/'.$relative;
        Storage::disk('public')->put($path, File::get($source));

        return $path;
    }

    private function heroSlides(): void
    {
        $slides = [
            ['construction', 'المقاولات والأعمال المساحية', 'تنفيذ مشاريع البنية التحتية بأعلى المعايير', 'hero/construction.jpg'],
            ['landscaping', 'الزراعة وتنسيق الحدائق', 'تصميم وتنفيذ المساحات الخضراء', 'hero/landscaping.jpg'],
            ['pest-control', 'مكافحة الحشرات والقوارض', 'حلول آمنة وفعالة لمكافحة الآفات', 'hero/pest-control.jpg'],
        ];

        foreach ($slides as $order => [$category, $title, $description, $image]) {
            HeroSlide::updateOrCreate(['category' => $category], [
                'title' => $title,
                'subtitle' => 'تنفيذ مشاريع متكاملة بأعلى معايير الجودة',
                'card_title' => $title,
                'card_description' => $description,
                'image_path' => $this->image($image),
                'sort_order' => $order + 1,
            ]);
        }
    }

    private function services(): void
    {
        $services = [
            'construction' => ['المقاولات والأعمال المساحية', 'نقدم خدمات متكاملة في تنفيذ المشاريع الإنشائية وأعمال البنية التحتية، بالإضافة إلى جميع أعمال الرفع المساحي باستخدام أحدث التقنيات والأجهزة.', [
                'أعمال الرفع المساحي', 'التشييد والبناء', 'تنفيذ مشاريع البنية التحتية', 'شبكات المياه والصرف الصحي', 'تصريف السيول', 'الإشراف والصيانة', 'الأعمال الكهربائية', 'تنفيذ البلوك والإنترلوك', 'تنفيذ المناقصات الحكومية',
            ]],
            'landscaping' => ['الزراعة وتنسيق الحدائق', 'نقدم حلولًا متكاملة لتحويل المساحات إلى بيئات خضراء جذابة من خلال تصميم وتنفيذ مشاريع اللاند سكيب بأحدث الأساليب.', [
                'إنشاء وتشغيل وصيانة المشاتل', 'تصميم وتنفيذ الحدائق', 'تنفيذ المخططات العامة للمشاريع', 'تصميم وتنفيذ شبكات الري', 'أعمال اللاند سكيب', 'تركيب النجيل الطبيعي والصناعي', 'النباتات الداخلية', 'الأشجار والزهور الخارجية',
            ]],
            'pest-control' => ['مكافحة الحشرات والقوارض', 'نقدم خدمات متخصصة في مكافحة جميع أنواع الحشرات والآفات باستخدام أحدث التقنيات والمواد الآمنة للحفاظ على بيئة صحية.', [
                'مكافحة الحشرات المنزلية', 'مكافحة القوارض', 'مكافحة الأرضة', 'مكافحة البعوض والناموس', 'مكافحة الزواحف والعقارب', 'مكافحة الطيور الضارة', 'مكافحة الحيوانات الضالة',
            ]],
        ];

        $order = 0;
        foreach ($services as $category => [$title, $description, $features]) {
            Service::updateOrCreate(['category' => $category], [
                'title' => $title, 'description' => $description, 'features' => $features, 'sort_order' => ++$order,
            ]);
        }
    }

    private function projects(): void
    {
        $featured = [
            ['construction', 'مشروع البنية التحتية', 'projects/infrastructure-project.jpg'],
            ['landscaping', 'تصميم حديقة فاخرة', 'projects/luxury-garden-design.jpg'],
            ['construction', 'مجمع سكني حديث', 'projects/modern-residential-complex.jpg'],
            ['landscaping', 'تنسيق لاند سكيب', 'projects/landscape-coordination.jpg'],
            ['construction', 'مشروع رفع مساحي', 'projects/surveying-project.jpg'],
            ['construction', 'برج تجاري', 'projects/commercial-tower.jpg'],
        ];

        $pestControl = [
            ['مشروع القضاء على البعوض في جدة', 'تقليل انتشار الأمراض عن طريق القضاء على تجمعات البعوض من خلال استخدام طرق فعالة ومبتكرة.', 'works/jeddah-mosquitoes.jpg'],
            ['برنامج مكافحة الفئران في الدمام', 'تطبيق إستراتيجيات متكاملة لمكافحة الفئران في المناطق السكنية والصناعية للحفاظ على سلامة الغذاء.', 'works/dammam-rats.jpg'],
            ['مكافحة الحشرات في المدينة المنورة', 'توفير حلول طبيعية وصديقة للبيئة لمكافحة الحشرات الطائرة والحفاظ على صحة المواطنين.', 'works/madinah-insects.jpg'],
            ['إستراتيجية مكافحة الصراصير في الطائف', 'استخدام تقنيات حديثة في رصد ومكافحة الصراصير لضمان بيئة نظيفة وصحية.', 'works/taif-cockroaches.jpg'],
            ['التحصين ضد النمل الأبيض في الأحساء', 'تقديم خدمات فحص وعلاج لمنازل الأحساء لحمايتها من هجمات النمل الأبيض.', 'works/ahsa-termites.jpg'],
            ['حملة توعية ضد القوارض في الخبر', 'رفع مستوى الوعي حول أضرار القوارض وطرق مكافحتها من خلال ورش عمل ومواد توعوية.', 'works/khobar-awareness.jpg'],
            ['حملة مكافحة الذباب في أبها', 'تنفيذ خطة شاملة للحد من انتشار الذباب في المناطق العامة بواسطة مبيدات آمنة.', 'works/abha-flies.jpg'],
            ['تثقيف المجتمع في مكافحة الحشرات', 'تنظيم فعاليات تعليمية لتعريف المجتمع بكيفية مقاومة الحشرات ومكافحتها.', 'works/community-education.jpg'],
            ['برنامج الرصد المبكر للآفات في الباحة', 'إنشاء نظام إنذار مبكر لرصد انتشار الآفات واتخاذ الإجراءات الوقائية اللازمة.', 'works/baha-monitoring.jpg'],
        ];

        $order = 0;
        foreach ($featured as [$category, $title, $image]) {
            Project::updateOrCreate(['title' => $title], [
                'category' => $category, 'image_path' => $this->image($image), 'is_featured' => true, 'sort_order' => ++$order,
            ]);
        }

        foreach ($pestControl as [$title, $description, $image]) {
            Project::updateOrCreate(['title' => $title], [
                'category' => 'pest-control', 'description' => $description, 'image_path' => $this->image($image), 'sort_order' => ++$order,
            ]);
        }
    }

    private function gallery(): void
    {
        foreach (range(1, 7) as $i) {
            GalleryImage::updateOrCreate(['image_path' => "seed/gallery/landscaping-{$i}.jpg"], [
                'category' => 'landscaping', 'sort_order' => $i, 'image_path' => $this->image("gallery/landscaping-{$i}.jpg") ?? "seed/gallery/landscaping-{$i}.jpg",
            ]);
        }
    }

    private function clients(): void
    {
        $clients = [
            ['الشركة السعودية للكهرباء', 'clients/saudi-electricity-company.png'],
            ['شركة المياه الوطنية', 'clients/national-water-company.png'],
            ['أمانة منطقة الرياض', 'clients/riyadh-region-municipality.png'],
            ['مدن', 'clients/modon.png'],
            ['KAFD', 'clients/kafd.png'],
        ];

        foreach ($clients as $order => [$name, $logo]) {
            Client::updateOrCreate(['name' => $name], ['logo_path' => $this->image($logo), 'sort_order' => $order + 1]);
        }
    }

    private function settings(): void
    {
        $settings = [
            'phones' => [
                ['label' => 'قسم المقاولات', 'number' => '0554177768'],
                ['label' => 'قسم المكافحة', 'number' => '0543958080'],
                ['label' => 'قسم الزراعة', 'number' => '0508542228'],
            ],
            'email' => 'info@honain.sa',
            'address' => 'الرياض، المملكة العربية السعودية',
            'working_hours' => ['السبت - الخميس: 8:00 ص - 5:00 م', 'الجمعة: مغلق'],
            'emergency_note' => 'خدمة الطوارئ متاحة 24/7',
            'tax_number' => '1131021685',
            'commercial_register' => '1131021685',
            'social' => ['facebook' => null, 'twitter' => null, 'instagram' => null, 'linkedin' => null],
            'stats' => ['years' => 40, 'projects' => 500, 'clients' => 300],
        ];

        foreach ($settings as $key => $value) {
            Setting::firstOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
