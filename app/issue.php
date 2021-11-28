<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class issue extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'member_id',
        'book_id',
        'issue_date',
        'return_date',
    ];
}
