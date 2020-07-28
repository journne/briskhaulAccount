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
                <h2>States</h2>
            </div>
            <div class="pull-right" style="margin-bottom: 20px">
                <a class="btn btn-success" href="{{ route('states.create') }}"> Create New State</a>
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
            <th>State</th>
            <th>Status</th>
            <th width="280px">Action</th>
        </tr>
   
        @foreach ($states->items() as $state)
        <tr>
            <td>{{ ++$i }}</td>
            <td>{{ $state->country }}</td>
            <td>{{ $state->state }}</td>
            <td>{{ $state->status }}</td>
            <td>
                <form action="{{ route('states.destroy',$state->id) }}" method="POST">
   
                    <a class="btn btn-info" href="{{ route('states.show',$state->id) }}">Show</a>
    
                    <a class="btn btn-primary" href="{{ route('states.edit',$state->id) }}">Edit</a>
   
                    @csrf
                    @method('DELETE')
      
                    <button type="submit" class="btn btn-danger">Delete</button>
                </form>
            </td>
        </tr>
        @endforeach
    </table>
  
    {!! $states->links() !!}
</div>
</div>
        </div>
    </div>
   

@endsection