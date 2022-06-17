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
    'progression' => ProgressionController::class,
    'types' => TypeController::class,
    'positions' => PositionController::class,
    'friends' => FriendController::class,
]);

// Route pour récupérer les données supprimées
Route::post('users/{user}/restore', [UserController::class, 'restore'])->name('users.restore');
Route::post('areas/{area}/restore', [AreaController::class, 'restore'])->name('areas.restore');
Route::post('robots/{robot}/restore', [RobotController::class, 'restore'])->name('robots.restore');
Route::post('progression/{progression}/restore', [ProgressionController::class, 'restore'])->name('progression.restore');
Route::post('types/{type}/restore', [TypeController::class, 'restore'])->name('types.restore');

Route::put('positions/{area}/{position}', [PositionController::class, 'update'])->name('positions.update');
Route::delete('positions/{area}/{position}', [PositionController::class, 'destroy'])->name('positions.destroy');
Route::post('positions/{area}/{position}/restore', [PositionController::class, 'restore'])->name('positions.restore');

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
