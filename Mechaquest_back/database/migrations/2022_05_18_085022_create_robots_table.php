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
            $table->string('robot_image')->nullable();
            $table->string('user_email')->nullable();
            $table->foreign('user_email')->references('email')->on('users')->onDelete('cascade');
            $table->string('type_robot');
            $table->foreign('type_robot')->references('type_name')->on('types');
            $table->boolean('main_robot')->nullable();
            $table->integer('current_hp')->nullable();
            $table->integer('current_atk')->nullable();
            $table->integer('current_def')->nullable();
            $table->integer('current_stam')->default(50);
            $table->integer('current_lvl')->default(1);
            $table->integer('current_xp')->default(0);
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
