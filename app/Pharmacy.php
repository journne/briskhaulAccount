<?php
  
namespace App;
  
use Illuminate\Database\Eloquent\Model;
   
class Pharmacy extends Model
{
    protected $fillable = [
        'pharmacy_name', 'address', 'phone_number', 'status'
    ];
}