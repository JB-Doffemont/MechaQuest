<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Progression extends Model
{
    use HasFactory, SoftDeletes;

    // On modifie la clé primaire par défaut de laravel ($id) par notre clé: le niveau du robot
    protected $primaryKey = 'lvl';
    public $incrementing = false;

    protected $fillable = [
        'lvl',
        'min_xp',
        'max_xp',
    ];
}
