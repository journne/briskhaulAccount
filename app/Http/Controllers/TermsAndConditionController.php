<?php

namespace App\Http\Controllers;

use App\TermsAndCondition;
use Illuminate\Http\Request;

class TermsAndConditionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $termsandconditions = TermsAndCondition::latest()->paginate(5);
        
        return view('terms-and-conditions.index',compact('termsandconditions'))
            ->with('i', (request()->input('page', 1) - 1) * 5);
    }
   
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('terms-and-conditions.create');
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
            
            
        ]);
  
        TermsAndCondition::create($request->all());
   
        return redirect()->route('terms-and-conditions.index')
                        ->with('success','TermsAndCondition created successfully.');
    }
   
    /**
     * Display the specified resource.
     *
     * @param  \App\TermsAndCondition  $termsandcondition
     * @return \Illuminate\Http\Response
     */
    public function show(TermsAndCondition $termsandcondition)
    {
        return view('terms-and-conditions.show',compact('termsandcondition'));
    }
   
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\TermsAndCondition  $termsandcondition
     * @return \Illuminate\Http\Response
     */
    public function edit(TermsAndCondition $termsandcondition)
    {
        return view('terms-and-conditions.edit',compact('termsandcondition'));
    }
  
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\TermsAndCondition  $termsandcondition
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TermsAndCondition $termsandcondition)
    {
        $request->validate([
            'name' => 'required',
            'detail' => 'required',
        ]);
  
        $termsandcondition->update($request->all());
  
        return redirect()->route('terms-and-conditions.index')
                        ->with('success','TermsAndCondition updated successfully');
    }
  
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\TermsAndCondition  $termsandcondition
     * @return \Illuminate\Http\Response
     */
    public function destroy(TermsAndCondition $termsandcondition)
    {
        $termsandcondition->delete();
  
        return redirect()->route('terms-and-conditions.index')
                        ->with('success','TermsAndCondition deleted successfully');
    }
}