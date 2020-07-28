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

                

                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">

                                    <h4 class="card-title">Buttons example</h4>
                                    <p class="card-title-desc">The Buttons extension for DataTables provides a common set of options, API methods and styling to display buttons on a page that will interact with a DataTable. The core library provides the based framework upon which plug-ins can built.
                                    </p>

                                    <table id="datatable-buttons" class="table table-striped table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                        <thead>
                                            <tr>
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
                                                <th>Action</th>
                                                
                                         
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                               <td>1</td>
                                                <td>Courier</td>
                                                <td>May 10, 2020 at 10:00 AM</td>
                                                <td>John Doe</td>
                                                <td>1182 A Road</td>
                                                <td>Walmart</td>
                                                <td>390340343</td>
                                                <td>Hailer Doe</td>
                                                <td>1182 A Road</td>
                                                <td>Walmart</td>
                                                <td>390340343</td>
                                                <td>Philip Dustin</td>
                                                <td>Delivery Personnel</td>
                                                <td>Envelope</td>
                                                <td>Yes</td>
                                                <td>12 Km</td>
                                                <td>16" x 14" x 12"</td>
                                                <td>16 Kg</td>
                                                <td>Bread</td>
                                                <td>2</td>
                                                <td>Knock on door</td>
                                               
                                                <td>Economic Delivery</td>
                                                <td>PayPal</td>
                                               
                                                <td>
                                    <div class="text-center">
                                        <span class="badge badge-pill badge-soft-primary font-size-11">Assigned</span>
                                    </div>
                                </td>   
                                    <td>
                                    <div class="text-center">
                                        <span class="badge badge-pill badge-soft-primary font-size-11">Edit</span>
                                        <span class="badge badge-pill badge-soft-primary font-size-11">Delete</span>
                                    </div>  
                                </td>  
                                            </tr>
                                           
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <!-- end col -->
                    </div>
                    <!-- end row -->

    @endsection

@section('script')

    <!-- Required datatable js -->
    <script src="{{ URL::asset('/libs/datatables/datatables.min.js')}}"></script>
    <script src="{{ URL::asset('/libs/jszip/jszip.min.js')}}"></script>
    <script src="{{ URL::asset('/libs/pdfmake/pdfmake.min.js')}}"></script>

    <!-- Datatable init js -->
    <script src="{{ URL::asset('/js/pages/datatables.init.js')}}"></script>

@endsection