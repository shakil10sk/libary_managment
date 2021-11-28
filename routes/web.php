<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use function Ramsey\Uuid\v1;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test',function(){
    return view('member');
});


Route::prefix('member')->group(function(){

    Route::get('add','memberController@index');
});

Route::get('/logout',function(){
    auth()->logout();
    return redirect()->to('/');
});



Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
