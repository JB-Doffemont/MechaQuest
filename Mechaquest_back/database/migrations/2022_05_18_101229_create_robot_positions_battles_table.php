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
        Schema::create('robot_positions_battles', function (Blueprint $table) {

            $table->integer('position')->default(0);

            $table->string('area_name');
            $table->unsignedBigInteger('robot_id');

            // creation clé primaire
            $table->primary(['position', 'area_name']);

            // relation clé étrangère à notre table
            $table->foreign('area_name')->references('name')->on('areas');
            $table->foreign('robot_id')->references('id')->on('robots');

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
        Schema::dropIfExists('robot_positions_battles');
    }
};
