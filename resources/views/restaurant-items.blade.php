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
                        <div class="col-sm-6">
						<a href="#addEmployeeModal" class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Add New Food</span></a>						
                    </div>
                    <br/>
                            <div class="card">
                           
                                <div class="card-body">

                                    <h4 class="card-title">Buttons example</h4>
                                    <p class="card-title-desc">The Buttons extension for DataTables provides a common set of options, API methods and styling to display buttons on a page that will interact with a DataTable. The core library provides the based framework upon which plug-ins can built.
                                    </p>

                                    <table id="datatable-buttons" class="table table-striped table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Restaurant ID</th>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Calories</th>
                                                <th>Price</th>
                                                <th>Category</th>
                                                <th>Action</th>
                                         
                                                
                                            </tr>
                                        </thead>

                                        <tbody>
                                           
                                            <tr>
                                                <td>Haley Kennedy</td>
                                                <td>Haley Kennedy</td>
                                                <td>Senior Marketing Designer</td>
                                                <td>Senior Marketing Designer</td>
                                                <td>Senior Marketing Designer</td>
                                                <td>Senior Marketing Designer</td>
                                                <td>Senior Marketing Designer</td>
                                                <td>
							<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
							<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
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