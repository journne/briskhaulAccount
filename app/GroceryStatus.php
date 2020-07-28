<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'ID',
        'Restaurant ID',
        'Title',
        'Description',
        'Calories',
        'Price',
        'Category',
        'Action'
              
    ];
}