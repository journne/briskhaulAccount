<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PharmacyItem extends Model
{
    protected $fillable = [
        'pharmacy_name', 'name_of_item', 'description', 'dosage', 'price', 'category', 'status'
    ];
}
