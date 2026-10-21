<?php

namespace App\Mail;

use App\Models\QuoteRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewQuoteRequest extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public QuoteRequest $quote) {}

    public function envelope(): Envelope
    {
        return new Envelope(subject: "طلب عرض سعر جديد من {$this->quote->name}");
    }

    public function content(): Content
    {
        $dashboard = rtrim((string) config('app.frontend_url'), '/')."/#/admin/quotes?id={$this->quote->id}";
        $lines = [
            'وصل طلب عرض سعر جديد من موقع حُنين:',
            '',
            "الاسم: {$this->quote->name}",
            "الجوال: {$this->quote->phone}",
            'الخدمة: '.($this->quote->service?->label() ?? 'غير محددة'),
            '',
            $this->quote->message,
            '',
            "عرض الطلب في لوحة التحكم: {$dashboard}",
        ];

        return new Content(htmlString: '<div dir="rtl" style="font-family:Tahoma,Arial;line-height:1.8">'.nl2br(e(implode("\n", $lines))).'</div>');
    }
}
