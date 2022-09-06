<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Area extends Model
{
    use HasFactory, SoftDeletes;

    // On modifie la clé primaire par défaut de laravel ($id) par notre clé: le nom du choix de niveau
    protected $primaryKey = 'name';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'background',
        'description',
        'number_of_battle',
        'reward',
        'required_stam',
    ];

    public function positions()
    {
        $this->belongsTo(Position::class)->withPivot('robot_id')->get();
    }
}
