<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'full_name', 'email', 'country', 'state', 'phone_number', 'image', 'home_address_landmark', 'office_address_landmark', 'others_address_landmark', 'status'
    ];
}
