<?php

use App\Http\Controllers\Api\LogementController;
use App\Http\Controllers\Api\ChatController;
use Illuminate\Support\Facades\Route;

Route::get('/logements', [LogementController::class, 'index']);
Route::get('/logements/{id}', [LogementController::class, 'show']);
Route::post('/chat', [ChatController::class, 'message']);