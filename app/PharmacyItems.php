<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'ID',
        'Pharmacy ID',
        'Title',
        'Description',
        'Calories',
        'Price',
        'Category',
        'Action'    
    ];
}