<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model
{
    protected $fillable = [
        'user_id',
        'amount',
        'reference',
        'billed_at',
    ];

    protected function casts(): array
    {
        return [
            'billed_at' => 'datetime',
        ];
    }

    public static function generateReference(): string
    {
        return sprintf('INV-%04d', ((int) static::max('id')) + 1);
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
