<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RobotPositionsBattles extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'robot_id',
        'area_name',
        'position',
    ];
}
