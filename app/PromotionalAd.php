<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PromotionalAd extends Model
{
    protected $fillable = [
        'title', 'description', 'image', 'status'
    ];
}
