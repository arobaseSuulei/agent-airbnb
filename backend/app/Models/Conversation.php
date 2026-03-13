<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    protected $table = 'conversations';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id', 'session_id', 'messages', 'reservation_id',
    ];

    protected $casts = [
        'messages' => 'array',
    ];
}