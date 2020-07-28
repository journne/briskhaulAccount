<?php

namespace App\Http\Controllers;

use App\PharmacyItem;
use Illuminate\Http\Request;

class PharmacyItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pharmacyitems = PharmacyItem::latest()->paginate(5);
        
        return view('pharmacy-items.index',compact('pharmacyitems'))
            ->with('i', (request()->input('page', 1) - 1) * 5);
    }
   
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('pharmacy-items.create');
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
            'name_of_item' => 'required',
            'description' => 'required',
            'dosage' => 'required',
            'price' => 'required',
            'category' => 'required',
            'status' => 'required',
            
            
        ]);
  
        PharmacyItem::create($request->all());
   
        return redirect()->route('pharmacy-items.index')
                        ->with('success','pharmacyitem created successfully.');
    }
   
    /**
     * Display the specified resource.
     *
     * @param  \App\PharmacyItem  $pharmacyitem
     * @return \Illuminate\Http\Response
     */
    public function show(PharmacyItem $pharmacyitem)
    {
        return view('pharmacy-items.show',compact('pharmacyitem'));
    }
   
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PharmacyItem  $pharmacyitem
     * @return \Illuminate\Http\Response
     */
    public function edit(PharmacyItem $pharmacyitem)
    {
        return view('pharmacy-items.edit',compact('pharmacyitem'));
    }
  
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PharmacyItem  $pharmacyitem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PharmacyItem $pharmacyitem)
    {
        $request->validate([
            'pharmacy_name' => 'required',
            'name_of_item' => 'required',
            'description' => 'required',
            'dosage' => 'required',
            'price' => 'required',
            'category' => 'required',
            'status' => 'required',
        ]);
  
        $pharmacyitem->update($request->all());
  
        return redirect()->route('pharmacy-items.index')
                        ->with('success','PharmacyItem updated successfully');
    }
  
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PharmacyItem  $pharmacyitem
     * @return \Illuminate\Http\Response
     */
    public function destroy(PharmacyItem $pharmacyitem)
    {
        $pharmacyitem->delete();
  
        return redirect()->route('pharmacy-items.index')
                        ->with('success','PharmacyItem deleted successfully');
    }
}