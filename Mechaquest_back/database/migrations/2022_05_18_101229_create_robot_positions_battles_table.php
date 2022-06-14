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

            $table->unsignedBigInteger('robot_id');
            $table->string('area_name');

            // creation clé composite
            $table->primary(['robot_id', 'area_name']);

            // relation clé étrangère à clé primaire
            $table->foreign('robot_id')->references('id')->on('robots');
            $table->foreign('area_name')->references('name')->on('areas');

            $table->integer('position')->default(0);
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
