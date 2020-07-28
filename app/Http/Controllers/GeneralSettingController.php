<?php

namespace App\Http\Controllers;

use App\GeneralSetting;
use Illuminate\Http\Request;

class GeneralSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $generalsettings = GeneralSetting::latest()->paginate(5);
        
        return view('general-settings.index',compact('generalsettings'))
            ->with('i', (request()->input('page', 1) - 1) * 5);
    }
   
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('general-settings.create');
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
            'banner_image' => 'required',
            
            
        ]);
  
        GeneralSetting::create($request->all());
   
        return redirect()->route('general-settings.index')
                        ->with('success','generalsetting created successfully.');
    }
   
    /**
     * Display the specified resource.
     *
     * @param  \App\GeneralSetting  $generalsetting
     * @return \Illuminate\Http\Response
     */
    public function show(GeneralSetting $generalsetting)
    {
        return view('general-settings.show',compact('generalsetting'));
    }
   
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\GeneralSetting  $generalsetting
     * @return \Illuminate\Http\Response
     */
    public function edit(GeneralSetting $generalsetting)
    {
        return view('general-settings.edit',compact('generalsetting'));
    }
  
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\GeneralSetting  $generalsetting
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, GeneralSetting $generalsetting)
    {
        $request->validate([
            
            'banner_image' => 'required',
        ]);
  
        $generalsetting->update($request->all());
  
        return redirect()->route('general-settings.index')
                        ->with('success','GeneralSetting updated successfully');
    }
  
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\GeneralSetting  $generalsetting
     * @return \Illuminate\Http\Response
     */
    public function destroy(GeneralSetting $generalsetting)
    {
        $generalsetting->delete();
  
        return redirect()->route('general-settings.index')
                        ->with('success','GeneralSetting deleted successfully');
    }
}