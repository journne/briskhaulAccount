<?php

namespace App\Http\Controllers;

use App\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $customers = Customer::latest()->paginate(5);
        
        return view('customers.index',compact('customers'))
            ->with('i', (request()->input('page', 1) - 1) * 5);
    }
   
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('customers.create');
    }
  
    /**
     * Store a newly created resource in storage.
     *
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required',
            'full_name' => 'required',
            'email' => 'required',
            'country' => 'required',
            'state' => 'required',
            'phone_number' => 'required',
            'image' => 'required',
            'home_address_landmark' => 'required',
            'office_address_landmark' => 'required',
            'others_address_landmark' => 'required',
            'status' => 'required'
            
        ]);
  
        Customer::create($request->all());
   
        return redirect()->route('customers.index')
                        ->with('success','customer created successfully.');
    }
   
    /**
     * Display the specified resource.
     *
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show(Customer $customer)
    {
        return view('customers.show',compact('customer'));
    }
   
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function edit(Customer $customer)
    {
        return view('customers.edit',compact('customer'));
    }
  
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Customer $customer)
    {
        $request->validate([
            'full_name' => 'required',
            'email' => 'required',
            'country' => 'required',
            'state' => 'required',
            'phone_number' => 'required',
            'image' => 'required',
            'home_address_landmark' => 'required',
            'office_address_landmark' => 'required',
            'others_address_landmark' => 'required',
            'status' => 'required',
        ]);
  
        $customer->update($request->all());
  
        return redirect()->route('customers.index')
                        ->with('success','Customer updated successfully');
    }
  
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();
  
        return redirect()->route('customers.index')
                        ->with('success','Customer deleted successfully');
    }
}