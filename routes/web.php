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

Route::get('/phpTest',function(){
    $x = 10;
    $y = 20;

    // Haredoc
    $text = <<<TEXT
    i am shakil $x + $y
    TEXT;

    echo $text."<br>";

    var_dump($text);

    echo "<br>";

    // Nowdoc
    $text = <<<'TEXT'
    i am shakil $x + $y
    TEXT;
    echo nl2br($text);

    // var_dump($text);

});

Route::get('/', function () {
    return redirect()->to('/login');
})->name('login');

// Route::get('new',function(){
//     app()->make('my_service');
// });

Auth::routes();



Route::group(['middleware' => 'auth'],function(){

    Route::get('/logout',function(){
        // auth()->logout();
        Auth::logout();
        return redirect()->to('/login');
    })->name('logout');


    Route::prefix('member')->group(function(){

        Route::get('/add','memberController@index')->name('add_member');

        Route::post('/store','memberController@store')->name('store_member');

        Route::get('/list_data','memberController@list_data')->name('list_data');
    });

});

Route::get('/home', 'HomeController@index')->name('home');




