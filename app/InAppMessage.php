<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InAppMessage extends Model
{
    protected $fillable = [
        'full_name', 'phone_number', 'message', 'status'
    ];
}
