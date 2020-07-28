<?php

namespace App\Http\Controllers;

use App\DeliveryMode;
use Illuminate\Http\Request;

class DeliveryModeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $deliverymodes = DeliveryMode::latest()->paginate(5);
  
        return view('delivery-modes.index',compact('deliverymodes'))
            ->with('i', (request()->input('page', 1) - 1) * 5);
    }
   
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('delivery-modes.create');
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
            'delivery_mode' => 'required',
            'description' => 'required',
            'price' => 'required',
            'status' => 'required',
        ]);
  
        DeliveryMode::create($request->all());
   
        return redirect()->route('delivery-modes.index')
                        ->with('success','Delivery created successfully.');
    }
   
    /**
     * Display the specified resource.
     *
     * @param  \App\DeliveryMode  $deliverymode
     * @return \Illuminate\Http\Response
     */
    public function show(DeliveryMode $deliverymode)
    {
        return view('delivery-modes.show',compact('deliverymode'));
    }
   
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\DeliveryMode  $deliverymode
     * @return \Illuminate\Http\Response
     */
    public function edit(DeliveryMode $deliverymode)
    {
        return view('delivery-modes.edit',compact('deliverymode'));
    }
  
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\DeliveryMode  $deliverymode
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DeliveryMode $deliverymode)
    {
        $request->validate([
            'delivery_mode' => 'required',
            'description' => 'required',
            'price' => 'required',
            'status' => 'required',
        ]);
  
        $deliverymode->update($request->all());
  
        return redirect()->route('delivery-modes.index')
                        ->with('success','Delivery updated successfully');
    }
  
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\DeliveryMode  $deliverymode
     * @return \Illuminate\Http\Response
     */
    public function destroy(DeliveryMode $deliverymode)
    {
        $deliverymode->delete();
  
        return redirect()->route('delivery-modes.index')
                        ->with('success','Delivery Mode deleted successfully');
    }
}