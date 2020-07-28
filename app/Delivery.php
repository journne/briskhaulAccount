<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    protected $fillable = [
        'Order ID', 'Service Name', 'Date and Time', 'Senders Name', 'Senders Address', 'Landmark', 'Phone Number', 'Receivers Name', 'Receivers Address', 'Landmark', 'Phone Number', 'Employee Name', 'Employee Role', 'Courier Type', 'Fragile', 'Distance', 'Height, Width, Length', 'Weight', 'Items', 'Quantity', 'Additional Info', 'Delivery Mode', 'Payment Mode', 'Delivery Status', 
      
  
    ];
}
