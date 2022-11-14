<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Robot extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'robot_name',
        'type_robot',
        'reward',
        'price',
        'main_robot',
        'current_stam'
    ];
}
