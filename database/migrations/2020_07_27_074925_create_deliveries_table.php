<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeliveriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deliveries', function (Blueprint $table) {
            $table->id();
            $table->string('order_id');
            $table->string('service_name');
            $table->string('date_and_time');
            $table->string('senders_name');
            $table->string('senders_address');
            $table->string('senders_landmark');
            $table->string('senders_phone_number');
            $table->string('Receivers Name');
            $table->string('Receivers Address');
            $table->string('Landmark');
            $table->string('Phone Number');
            $table->string('Employee Name');
            $table->string('Employee Role');
            $table->string('Courier Type');
            $table->string('Fragile');
            $table->string('Distance');
            $table->string('Height, Width, Length');
            $table->string('Weight');
            $table->string('Items');
            $table->string('Quantity');
            $table->string('Additional Info');
            $table->string('Delivery Mode');
            $table->string('Payment Mode');
            $table->string('Delivery Status');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deliveries');
    }
}
