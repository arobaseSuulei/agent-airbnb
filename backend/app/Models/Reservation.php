<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $table = 'reservations';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id', 'logement_id', 'date_arrivee',
        'date_depart', 'nb_personnes', 'prix_total',
        'statut', 'message_ia',
    ];

    protected $casts = [
        'date_arrivee' => 'date',
        'date_depart' => 'date',
        'prix_total' => 'float',
    ];

    public function logement()
    {
        return $this->belongsTo(Logement::class, 'logement_id');
    }
}