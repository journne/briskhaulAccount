@extends('layouts.master')

@section('title') Modals @endsection

@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2>Edit Message</h2>
            </div>
            <div class="pull-right">
                <a class="btn btn-primary" href="{{ route('in-app-messages.index') }}"> Back</a>
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
  
    <form action="{{ route('in-app-messages.update',$inappmessage->id) }}" method="POST">
        @csrf
        @method('PUT')
   
         <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Full Name</strong>
                    <input type="text" name="full_name" value="{{ $inappmessage->full_name }}" class="form-control" placeholder="Full Name">
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Phone Number</strong>
                    <textarea class="form-control" style="height:150px" name="phone_number" placeholder="Phone Number">{{ $inappmessage->phone_number }}</textarea>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Message</strong>
                    <textarea class="form-control" style="height:150px" name="message" placeholder="Message">{{ $inappmessage->message }}</textarea>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Status</strong>
                    <textarea class="form-control" style="height:150px" name="status" placeholder="Status">{{ $inappmessage->status }}</textarea>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 text-center">
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </div>
   
    </form>
@endsection