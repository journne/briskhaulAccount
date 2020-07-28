<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DeliveryMode extends Model
{
    protected $fillable = [
        'delivery_mode', 'description', 'price', 'status'
    ];
}
