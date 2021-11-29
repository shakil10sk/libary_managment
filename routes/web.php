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
    return redirect()->to('/login');
})->name('login');


Auth::routes();



Route::group(['middleware' => 'auth'],function(){

    Route::get('/logout',function(){
        auth()->logout();
        return redirect()->to('/login');
    })->name('logout');


    Route::prefix('member')->group(function(){

        Route::get('/add','memberController@index')->name('add_member');

        Route::post('/store','memberController@store')->name('store_member');

        Route::get('/list_data','memberController@list_data')->name('list_data');
    });

});

Route::get('/home', 'HomeController@index')->name('home');




