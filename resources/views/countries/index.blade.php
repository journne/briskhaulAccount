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
                <h2>Country</h2>
            </div>
            <div class="pull-right" style="margin-bottom: 20px">
                <a class="btn btn-success" href="{{ route('countries.create') }}"> Create New Country</a>
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
            <th>Country</th>
            <th>Status</th>
            <th width="280px">Action</th>
        </tr>
   
        @foreach ($countries->items() as $country)
        <tr>
            <td>{{ ++$i }}</td>
            <td>{{ $country->country }}</td>
          
            <td>{{ $country->status }}</td>
            <td>
                <form action="{{ route('countries.destroy',$country->id) }}" method="POST">
   
                    <a class="btn btn-info" href="{{ route('countries.show',$country->id) }}">Show</a>
    
                    <a class="btn btn-primary" href="{{ route('countries.edit',$country->id) }}">Edit</a>
   
                    @csrf
                    @method('DELETE')
      
                    <button type="submit" class="btn btn-danger">Delete</button>
                </form>
            </td>
        </tr>
        @endforeach
    </table>
  
    {!! $countries->links() !!}
</div>
</div>
        </div>
    </div>
   

@endsection