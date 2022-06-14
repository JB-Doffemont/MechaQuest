<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('robots', function (Blueprint $table) {
            $table->id();
            $table->string('robot_name');
            $table->string('user_email');
            $table->foreign('user_email')->references('email')->on('users')->onUpdate('cascade')->onDelete('cascade'); // soft deleting ?
            $table->string('type_robot');
            $table->foreign('type_robot')->references('type_name')->on('types');
            $table->boolean('main_robot');
            $table->integer('current_hp');
            $table->integer('current_atk');
            $table->integer('current_def');
            $table->integer('current_stam');
            $table->integer('current_lvl');
            $table->integer('current_xp');
            $table->integer('reward');
            $table->integer('price');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('robots');
    }
};
