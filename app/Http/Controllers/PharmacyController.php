<?php

namespace App\Http\Controllers;

use App\Pharmacy;
use Illuminate\Http\Request;

class PharmacyController extends Controller

{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pharmacies = Pharmacy::latest()->paginate(5);
  
        return view('pharmacies.index',compact('pharmacies'))
            ->with('i', (request()->input('page', 1) - 1) * 5);
    }
   
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('pharmacies.create');
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
            'pharmacy_name' => 'required',
            'address' => 'required',
            'phone_number' => 'required',
            'status' => 'required',
        ]);
  
        Pharmacy::create($request->all());
   
        return redirect()->route('pharmacies.index')
                        ->with('success','Pharmacy created successfully.');
    }
   
    /**
     * Display the specified resource.
     *
     * @param  \App\Pharmacy  $Pharmacy
     * @return \Illuminate\Http\Response
     */
    public function show(Pharmacy $pharmacy)
    {
        return view('pharmacies.show',compact('pharmacy'));
    }
   
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Pharmacy  $Pharmacy
     * @return \Illuminate\Http\Response
     */
    public function edit(Pharmacy $pharmacy)
    {
        return view('pharmacies.edit',compact('pharmacy'));
    }
  
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Pharmacy  $Pharmacy
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pharmacy $pharmacy)
    {
        $request->validate([
            'pharmacy_name' => 'required',
            'address' => 'required',
            'phone_number' => 'required',
            'status' => 'required',
        ]);
  
        $pharmacy->update($request->all());
  
        return redirect()->route('pharmacies.index')
                        ->with('success','Pharmacy updated successfully');
    }
  
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Pharmacy  $pharmacy
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pharmacy $pharmacy)
    {
        $pharmacy->delete();
  
        return redirect()->route('pharmacies.index')
                        ->with('success','Pharmacy deleted successfully');
    }
}