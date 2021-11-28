<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class book extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'book_name',
        'book_code',
        'writter',
        'stock',
    ];
}
