<?php

namespace App\Http\Controllers;

use App\Drone;
use Illuminate\Http\Request;

class DroneController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $drones = Drone::latest()->paginate(5);
        
        return view('drones.index',compact('drones'))
            ->with('i', (request()->input('page', 1) - 1) * 5);
    }
   
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('drones.create');
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
            'drone_id' => 'required',
            'status' => 'required',
            'employee_assigned' => 'required',
            
        ]);
  
        Drone::create($request->all());
   
        return redirect()->route('drones.index')
                        ->with('success','drone created successfully.');
    }
   
    /**
     * Display the specified resource.
     *
     * @param  \App\Drone  $drone
     * @return \Illuminate\Http\Response
     */
    public function show(Drone $drone)
    {
        return view('drones.show',compact('drone'));
    }
   
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Drone  $drone
     * @return \Illuminate\Http\Response
     */
    public function edit(Drone $drone)
    {
        return view('drones.edit',compact('drone'));
    }
  
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Drone  $drone
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Drone $drone)
    {
        $request->validate([
            'drone_id' => 'required',
            'status' => 'required',
            'employee_assigned' => 'required',
        ]);
  
        $drone->update($request->all());
  
        return redirect()->route('drones.index')
                        ->with('success','Drone updated successfully');
    }
  
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Drone  $drone
     * @return \Illuminate\Http\Response
     */
    public function destroy(Drone $drone)
    {
        $drone->delete();
  
        return redirect()->route('drones.index')
                        ->with('success','Drone deleted successfully');
    }
}