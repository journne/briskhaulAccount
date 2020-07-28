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
                <h2>Edit Service</h2>
            </div>
            <div class="pull-right" style=" margin-top: 20px; margin-bottom: 20px;">
                <a class="btn btn-primary" href="{{ route('services.index') }}"> Back</a>
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
  
    <form action="{{ route('services.update',$service->id) }}" method="POST">
        @csrf
        @method('PUT')
   
         <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Service Name</strong>
                    <input type="text" name="service_name" value="{{ $service->service_name }}" class="form-control" placeholder="Name">
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Service Image</strong>
                    <textarea class="form-control" style="height:150px" name="service_image" placeholder="Detail">{{ $service->service_image }}</textarea>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Status</strong>
                    <input type="text" name="service_status" value="{{ $service->service_status }}" class="form-control" placeholder="Name"></textarea>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 text-center">
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </div>
   
    </form>
@endsection