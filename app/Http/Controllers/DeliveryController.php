<?php

namespace App\Http\Controllers;

use App\Delivery;
use Illuminate\Http\Request;

class DeliveryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $deliveries = Delivery::latest()->paginate(5);
  
        return view('deliveries.index',compact('deliveries'))
            ->with('i', (request()->input('page', 1) - 1) * 5);
    }
   
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('deliveries.create');
    }
  
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'Order ID' => 'required',
                                                'Service Name' => 'required',
                                                'Date and Time' => 'required',
                                                'Senders Name' => 'required',
                                                'Senders Address' => 'required',
                                                'Landmark' => 'required',
                                                'Phone Number' => 'required',
                                                'Receivers Name' => 'required',
                                                'Receivers Address' => 'required',
                                                'Landmark' => 'required',
                                                'Phone Number' => 'required',
                                                'Employee Name' => 'required',
                                                'Employee Role' => 'required',
                                                'Courier Type' => 'required',
                                                'Fragile' => 'required',
                                                'Distance' => 'required',
                                                'Height, Width, Length' => 'required',
                                                'Weight' => 'required',
                                                'Items' => 'required',
                                                'Quantity' => 'required',
                                                'Additional Info' => 'required',
                                                'Delivery Mode' => 'required',
                                                'Payment Mode' => 'required',
                                                'Delivery Status' => 'required',
        ]);
  
        Delivery::create($request->all());
   
        return redirect()->route('deliveries.index')
                        ->with('success','Delivery created successfully.');
    }
   
    /**
     * Display the specified resource.
     *
     * @param  \App\Delivery  $delivery
     * @return \Illuminate\Http\Response
     */
    public function show(Delivery $delivery)
    {
        return view('deliveries.show',compact('delivery'));
    }
   
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Delivery  $delivery
     * @return \Illuminate\Http\Response
     */
    public function edit(Delivery $delivery)
    {
        return view('deliveries.edit',compact('delivery'));
    }
  
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Delivery  $delivery
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Delivery $delivery)
    {
        $request->validate([
            'Order ID' => 'required',
                                                'Service Name' => 'required',
                                                'Date and Time' => 'required',
                                                'Senders Name' => 'required',
                                                'Senders Address' => 'required',
                                                'Landmark' => 'required',
                                                'Phone Number' => 'required',
                                                'Receivers Name' => 'required',
                                                'Receivers Address' => 'required',
                                                'Landmark' => 'required',
                                                'Phone Number' => 'required',
                                                'Employee Name' => 'required',
                                                'Employee Role' => 'required',
                                                'Courier Type' => 'required',
                                                'Fragile' => 'required',
                                                'Distance' => 'required',
                                                'Height, Width, Length' => 'required',
                                                'Weight' => 'required',
                                                'Items' => 'required',
                                                'Quantity' => 'required',
                                                'Additional Info' => 'required',
                                                'Delivery Mode' => 'required',
                                                'Payment Mode' => 'required',
                                                'Delivery Status' => 'required',
           
        ]);
  
        $delivery->update($request->all());
  
        return redirect()->route('deliveries.index')
                        ->with('success','Delivery updated successfully');
    }
  
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Delivery  $delivery
     * @return \Illuminate\Http\Response
     */
    public function destroy(Delivery $delivery)
    {
        $Delivery->delete();
  
        return redirect()->route('deliveries.index')
                        ->with('success','Delivery deleted successfully');
    }
}