<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class member extends Model
{
    use SoftDeletes;

    protected $fillable=[
        'name',
        'age',
        'nid',
        'student_id',
        'school_name',
        'address',
        'mobile',
    ];

}
