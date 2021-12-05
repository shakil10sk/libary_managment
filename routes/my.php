<?php



use Illuminate\Support\Facades\Route;


Route::get('/my_new',function(){
    // echo "done new route";
    return view('my_blade');
});
