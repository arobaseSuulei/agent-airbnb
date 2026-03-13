<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Logement extends Model
{
    protected $table = 'logements';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'titre', 'description', 'ville', 'pays',
        'adresse', 'prix_par_nuit', 'capacite',
        'equipements', 'photos', 'disponible',
    ];

    protected $casts = [
        'equipements' => 'array',
        'photos' => 'array',
        'disponible' => 'boolean',
        'prix_par_nuit' => 'float',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'logement_id');
    }
}