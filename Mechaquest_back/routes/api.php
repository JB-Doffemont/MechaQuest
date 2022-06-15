<?php

use App\Http\Controllers\AreaController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\ProgressionController;
use App\Http\Controllers\RobotController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Routes ressources
Route::resources([
    'users' => UserController::class,
    'robots' => RobotController::class,
    'areas' => AreaController::class,
    'progressions' => ProgressionController::class,
    'types' => TypeController::class,
    'positions' => PositionController::class,
    'friends' => FriendController::class,
]);


/* Ajout du middleware pour les routes ressources
Route::group(['middleware' => 'auth'], function () {
    Route::resources([
        'user' => UserController::class,
        'robot' => RobotController::class,
        'area' => AreaController::class,
        'progression' => ProgressionController::class,
        'type' => TypeController::class,
        'position' => PositionController::class,
        'friend' => FriendController::class,
    ]);
}); */
