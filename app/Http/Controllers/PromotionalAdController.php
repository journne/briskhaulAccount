<?php

namespace App\Http\Controllers;

use App\PromotionalAd;
use Illuminate\Http\Request;

class PromotionalAdController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $promotionalads = PromotionalAd::latest()->paginate(5);
  
        return view('promotional-ads.index',compact('promotionalads'))
            ->with('i', (request()->input('page', 1) - 1) * 5);
    }
   
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('promotional-ads.create');
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
            'title' => 'required',
            'description' => 'required',
            'image' => 'required',
            'status' => 'required',
        ]);
  
        PromotionalAd::create($request->all());
   
        return redirect()->route('promotional-ads.index')
                        ->with('success','PromotionalAd created successfully.');
    }
   
    /**
     * Display the specified resource.
     *
     * @param  \App\PromotionalAd  $promotionalad
     * @return \Illuminate\Http\Response
     */
    public function show(PromotionalAd $promotionalad)
    {
        return view('promotional-ads.show',compact('promotionalad'));
    }
   
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PromotionalAd  $promotionalad
     * @return \Illuminate\Http\Response
     */
    public function edit(PromotionalAd $promotionalad)
    {
        return view('promotional-ads.edit',compact('promotionalad'));
    }
  
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PromotionalAd  $promotionalad
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PromotionalAd $promotionalad)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'required',
            'status' => 'required',
        ]);
  
        $promotionalad->update($request->all());
  
        return redirect()->route('promotional-ads.index')
                        ->with('success','PromotionalAd updated successfully');
    }
  
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PromotionalAd  $promotionalad
     * @return \Illuminate\Http\Response
     */
    public function destroy(PromotionalAd $promotionalad)
    {
        $promotionalad->delete();
  
        return redirect()->route('promotional-ads.index')
                        ->with('success','PromotionalAd deleted successfully');
    }
}