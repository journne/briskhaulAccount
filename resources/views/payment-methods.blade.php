@extends('layouts.master')

@section('title') Cards @endsection

@section('content')

     @component('common-components.breadcrumb')
         @slot('title') Cards  @endslot
         @slot('li_1') UI Elements  @endslot
     @endcomponent

<div class="row">
<div class="col-md-6 col-xl-3">

<div class="card">
    <div class="card-body">
        <h4 class="card-title mt-0">Cash on Pickup</h4>
        <h6 class="card-subtitle font-14 text-muted">Pay at Pickup Location</h6>
    </div>
    <img class="img-fluid" src="/images/small/img-4.jpg" alt="Card image cap">
    
    <div class="card-body">
        <a href="#" class="card-link">Disbale</a>
        <a href="" class="card-link">Edit</a>
    </div>
</div>

</div>
    <!-- end col -->
    <div class="col-md-6 col-xl-3">

<div class="card">
    <div class="card-body">
        <h4 class="card-title mt-0">Cash on Delivery</h4>
        <h6 class="card-subtitle font-14 text-muted">Pay at Delivery Location</h6>
    </div>
    <img class="img-fluid" src="/images/small/img-4.jpg" alt="Card image cap">
    <div class="card-body">
        <a href="#" class="card-link">Disable</a>
        <a href="#" class="card-link">Edit</a>
    </div>
</div>

</div>
    <!-- end col -->
    <div class="col-md-6 col-xl-3">

<div class="card">
    <div class="card-body">
        <h4 class="card-title mt-0">Paypal</h4>
        <h6 class="card-subtitle font-14 text-muted">Pay with PayPal Account</h6>
    </div>
    <img class="img-fluid" src="/images/small/img-4.jpg" alt="Card image cap">
    <ul class="list-group list-group-flush">
                <li class="list-group-item">Secret Key: dshjfvduysdbcasiedbbdwdwe</li>
                <li class="list-group-item">Public Key: sahaisuhdiuhdiuhdiweduhwe</li>
    </ul>
    <div class="card-body">
        <a href="#" class="card-link">Disable</a>
        <a href="#" class="card-link">Edit</a>
    </div>
</div>

</div>
    <!-- end col -->
    <div class="col-md-6 col-xl-3">

<div class="card">
    <div class="card-body">
        <h4 class="card-title mt-0">Stripe</h4>
        <h6 class="card-subtitle font-14 text-muted">Pay via Stripe (North America)</h6>
    </div>
    <img class="img-fluid" src="/images/small/img-4.jpg" alt="Card image cap">
    <ul class="list-group list-group-flush">
                <li class="list-group-item">Secret Key: dshjfvduysdbcasiedbbdwdwe</li>
                <li class="list-group-item">Public Key: sahaisuhdiuhdiuhdiweduhwe</li>
    </ul>
    <div class="card-body">
        <a href="#" class="card-link">Disable</a>
        <a href="#" class="card-link">Edit</a>
    </div>
</div>

</div>
    <!-- end col -->

    </div>
<!-- end row -->

<div class="col-md-6 col-xl-3">

<div class="card">
    <div class="card-body">
        <h4 class="card-title mt-0">Paystack</h4>
        <h6 class="card-subtitle font-14 text-muted">Pay via Paystack (Africa)</h6>
    </div>
    <img class="img-fluid" src="/images/small/img-4.jpg" alt="Card image cap">
    <ul class="list-group list-group-flush">
                <li class="list-group-item">Secret Key: dshjfvduysdbcasiedbbdwdwe</li>
                <li class="list-group-item">Public Key: sahaisuhdiuhdiuhdiweduhwe</li>
    </ul>
    <div class="card-body">
        <a href="#" class="card-link">Disable</a>
        <a href="#" class="card-link">Edit</a>
    </div>
</div>

</div>
    <!-- end col -->

    </div>
<!-- end row -->





@endsection