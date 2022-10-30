<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Area extends Model
{
    use HasFactory, SoftDeletes;

    // On modifie la clé primaire par défaut de laravel ($id) par notre clé: le nom du choix de niveau. Une planète ne peut donc pas être identique.
    protected $primaryKey = 'name';
    public $incrementing = false;
    protected $keyType = 'string';

    // Données modifiables pour une arène
    protected $fillable = [
        'name',
        'battle_background',
        'menu_background',
        'description',
        'number_of_battle',
        'reward',
        'required_stam',
    ];

    // Utilisation des pivots pour récupérer les positions des robots liées aux planètes
    public function positions()
    {
        $this->belongsTo(Position::class)->withPivot('robot_id')->get();
    }
}
