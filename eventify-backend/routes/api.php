<?php


use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EventController;

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth:sanctum');
Route::get('events',[EventController::class,'index']);
Route::get('events/{event}',[EventController::class,'show']);
Route::middleware('auth:sanctum')->group(function () {
    // Route::get('events',[EventController::class,'index']);
    Route::post('events',[EventController::class,'store']);
    // Route::get('events/{event}',[EventController::class,'show']);
    Route::put('events/{event}',[EventController::class,'update']);
    Route::delete('events/{event}',[EventController::class,'destroy']);
    Route::post('events/{event}/register',[EventController::class,'register']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
