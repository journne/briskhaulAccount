<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'full_name', 'email', 'country', 'state', 'phone_number', 'image', 'employee_role', 'status'
    ];
}
