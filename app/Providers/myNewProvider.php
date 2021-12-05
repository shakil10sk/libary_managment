<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class myNewProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $new_data = array();
        $new_data['first_num']=10;
        $new_data['secound_num']=20;
        $new_data['result']=30;
        view()->share('number',$new_data);
    }
}
