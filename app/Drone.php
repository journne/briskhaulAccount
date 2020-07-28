<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Drone extends Model
{
    protected $fillable = [
        'drone_id', 'status', 'employee_assigned'
    ];
}
