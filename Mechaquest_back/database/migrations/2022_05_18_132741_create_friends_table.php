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
        Schema::create('friends', function (Blueprint $table) {


            $table->string('email_user1');
            $table->string('email_user2');

            // creation clé composite
            $table->primary(['email_user1', 'email_user2']);

            // relation clé étrangère à clé primaire
            $table->foreign('email_user1')->references('email')->on('users');
            $table->foreign('email_user2')->references('email')->on('users');

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
        Schema::dropIfExists('friends');
    }
};
