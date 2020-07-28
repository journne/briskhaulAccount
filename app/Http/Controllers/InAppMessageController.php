<?php

namespace App\Http\Controllers;

use App\InAppMessage;
use Illuminate\Http\Request;

class InAppMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $inappmessages = InAppMessage::latest()->paginate(5);
        
        return view('in-app-messages.index',compact('inappmessages'))
            ->with('i', (request()->input('page', 1) - 1) * 5);
    }
   
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('in-app-messages.create');
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
            'full_name' => 'required',
            'phone_number' => 'required',
            'message' => 'required',
            'status' => 'required',
            
        ]);
  
        InAppMessage::create($request->all());
   
        return redirect()->route('in-app-messages.index')
                        ->with('success','inappmessage created successfully.');
    }
   
    /**
     * Display the specified resource.
     *
     * @param  \App\InAppMessage  $inappmessage
     * @return \Illuminate\Http\Response
     */
    public function show(InAppMessage $inappmessage)
    {
        return view('in-app-messages.show',compact('inappmessage'));
    }
   
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\InAppMessage  $inappmessage
     * @return \Illuminate\Http\Response
     */
    public function edit(InAppMessage $inappmessage)
    {
        return view('in-app-messages.edit',compact('inappmessage'));
    }
  
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\InAppMessage  $inappmessage
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, InAppMessage $inappmessage)
    {
        $request->validate([
            'full_name' => 'required',
            'phone_number' => 'required',
            'message' => 'required',
            'status' => 'required',
        ]);
  
        $inappmessage->update($request->all());
  
        return redirect()->route('in-app-messages.index')
                        ->with('success','inappmessage updated successfully');
    }
  
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\InAppMessage  $inappmessage
     * @return \Illuminate\Http\Response
     */
    public function destroy(InAppMessage $inappmessage)
    {
        $inappmessage->delete();
  
        return redirect()->route('in-app-messages.index')
                        ->with('success','inappmessage deleted successfully');
    }
}