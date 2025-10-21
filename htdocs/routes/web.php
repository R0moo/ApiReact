<?php

use App\Http\Controllers\NotasController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::resource('/notas', NotasController::class);