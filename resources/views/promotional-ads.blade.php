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

                                    <h4 class="card-title">Promotional Ads</h4>
                                    <p class="card-title-desc">The Buttons extension for DataTables provides a common set of options, API methods and styling to display buttons on a page that will interact with a DataTable. The core library provides the based framework upon which plug-ins can built.
                                    </p>

                                    <table id="datatable-buttons" class="table table-striped table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                        <thead>
                                            <tr>
                                               
                                                <th>Title</th>
                                                <th>Image</th>
                                                <th>Description</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                                
                                            </tr>
                                        </thead>

                                        <tbody>
                                           
                                            <tr>
                                             
                                                <td>Sectional</td>
                                                <td>
                                                
                    <div class="col-md-6">
                        <img class="rounded mr-2" alt="200x200" width="200" src="/images/small/img-4.jpg" data-holder-rendered="true">
                    </div>
                                                </td>
                                                <td>Sofa is good</td>
                                                <td>
                                    <div class="text-center">
                                        <span class="badge badge-pill badge-soft-primary font-size-11">Responded</span>
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