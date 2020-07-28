@extends('layouts.master')

@section('title') Form Validation @endsection

@section('content')

 @component('common-components.breadcrumb')
         @slot('title') Form Validation  @endslot
         @slot('li_1') Forms  @endslot
     @endcomponent
     
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2>Edit Pharmacy</h2>
            </div>
            <div class="pull-right" style=" margin-top: 20px; margin-bottom: 20px;">
                <a class="btn btn-primary" href="{{ route('pharmacies.index') }}"> Back</a>
            </div>
        </div>
    </div>
   
    @if ($errors->any())
        <div class="alert alert-danger">
            <strong>Whoops!</strong> There were some problems with your input.<br><br>
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
  
    <form action="{{ route('pharmacies.update',$pharmacy->id) }}" method="POST">
        @csrf
        @method('PUT')
   
         <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Pharmacy Name</strong>
                    <input type="text" name="pharmacy_name" value="{{ $pharmacy->pharmacy_name }}" class="form-control" placeholder="Pharmacy Name">
                </div>
            </div>
           
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Address</strong>
                    <textarea class="form-control" style="height:150px" name="address" placeholder="Address">{{ $pharmacy->address }}</textarea>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Phone Number</strong>
                    <textarea class="form-control" style="height:150px" name="phone_number" placeholder="Phone Number">{{ $pharmacy->phone_number }}</textarea>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Status</strong>
                    <input type="text" name="pharmacy_status" value="{{ $pharmacy->pharmacy_status }}" class="form-control" placeholder="Status"></textarea>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 text-center">
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </div>
   
    </form>
@endsection