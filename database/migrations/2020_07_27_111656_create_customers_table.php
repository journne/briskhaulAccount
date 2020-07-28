<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('email');
            $table->string('country');
            $table->string('state');
            $table->string('phone_number');
            $table->string('image');
            $table->string('home_address_landmark');
            $table->string('home_landmark');
            $table->string('office_address_landmark');
            $table->string('office_landmark');
            $table->string('others_address_landmark');
            $table->string('others_landmark');
            $table->string('status');
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
        Schema::dropIfExists('customers');
    }
}
