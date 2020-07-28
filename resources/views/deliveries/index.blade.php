@extends('layouts.master')
@section('title') Data Tables @endsection
@section('css')

    <!-- DataTables -->
    <link href="{{ URL::asset('/libs/datatables/datatables.min.css')}}" rel="stylesheet" type="text/css" />

@endsection

@section('content')
@component('common-components.breadcrumb')
         @slot('title') Data Tables  @endslot
         @slot('li_1') Tables  @endslot
     @endcomponent
            <div class="pull-left">
                <h2>Services</h2>
            </div>
            <div class="pull-right" style="margin-bottom: 20px">
                <a class="btn btn-success" href="{{ route('deliveries.create') }}"> Create New Service</a>
            </div>

            @if ($message = Session::get('success'))
        <div class="alert alert-success">
            <p>{{ $message }}</p>
        </div>
    @endif
 
    <div class="row">
        <div class="col-lg-12 margin-tb">
        <div class="card">
                                <div class="card-body">

                                    <h4 class="card-title">Buttons example</h4>
                                    <p class="card-title-desc">The Buttons extension for DataTables provides a common set of options, API methods and styling to display buttons on a page that will interact with a DataTable. The core library provides the based framework upon which plug-ins can built.
                                    </p>

                                    <table id="datatable-buttons" class="table table-striped table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                        <thead>
                                        <tr>
            <th>No</th>
                                          <th>Order ID</th>
                                                <th>Service Name</th>
                                                <th>Date and Time</th>
                                                <th>Senders Name</th>
                                                <th>Senders Address</th>
                                                <th>Landmark</th>
                                                <th>Phone Number</th>
                                                <th>Receivers Name</th>
                                                <th>Receivers Address</th>
                                                <th>Landmark</th>
                                                <th>Phone Number</th>
                                                <th>Employee Name</th>
                                                <th>Employee Role</th>
                                                <th>Courier Type</th>
                                                <th>Fragile</th>
                                                <th>Distance</th>
                                                <th>Height, Width, Length</th>
                                                <th>Weight</th>
                                                <th>Items</th>
                                                <th>Quantity</th>
                                                <th>Additional Info</th>
                                                <th>Delivery Mode</th>
                                                <th>Payment Mode</th>
                                                <th>Delivery Status</th>
                                               
            <th width="280px">Action</th>
        </tr>
   
        @foreach ($deliveries->items() as $delivery)
        <tr>
            <td>{{ ++$i }}</td>
            <td>{{ $delivery->order_id }}</td>
            <td>{{ $delivery->service_name }}</td>
            <td>{{ $delivery->date_and_time }}</td>
            <td>{{ $delivery->sendersname }}</td>
            <td>{{ $delivery->senders_address }}</td>
            <td>{{ $delivery->senders_landmark }}</td>
            <td>{{ $delivery->senders_phone_number }}</td>
            <td>{{ $delivery->receivers_address }}</td>
            <td>{{ $delivery->receivers_landmark }}</td>
            <td>{{ $delivery->receivers_phone_number }}</td>
            <td>{{ $delivery->employee_name }}</td>
            <td>{{ $delivery->employee_role }}</td>
            <td>{{ $delivery->courier_type }}</td>
            <td>{{ $delivery->fragile }}</td>
            <td>{{ $delivery->distance }}</td>
            <td>{{ $delivery->height_width_length }}</td>
            <td>{{ $delivery->weight }}</td>
            <td>{{ $delivery->items }}</td>
            <td>{{ $delivery->quantity }}</td>
            <td>{{ $delivery->additional_info }}</td>
            <td>{{ $delivery->delivery_mode }}</td>
            <td>{{ $delivery->payment_mode }}</td>
            <td>{{ $delivery->delivery_status }}</td>
            <td>
                <form action="{{ route('deliveries.destroy',$delivery->id) }}" method="POST">
   
                    <a class="btn btn-info" href="{{ route('deliveries.show',$delivery->id) }}">Show</a>
    
                    <a class="btn btn-primary" href="{{ route('deliveries.edit',$delivery->id) }}">Edit</a>
   
                    @csrf
                    @method('DELETE')
      
                    <button type="submit" class="btn btn-danger">Delete</button>
                </form>
            </td>
        </tr>
        @endforeach
    </table>
  
    {!! $deliveries->links() !!}
</div>
</div>
        </div>
    </div>
   

@endsection