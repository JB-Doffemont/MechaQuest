<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Type extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'type_name';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'type_name',
        'base_hp',
        'base_atk',
        'base_def',
        'special',
    ];
}
