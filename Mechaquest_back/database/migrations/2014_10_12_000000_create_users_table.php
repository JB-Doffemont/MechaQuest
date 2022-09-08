<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use phpDocumentor\Reflection\Types\Nullable;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {

            $table->string('pseudo');
            $table->integer('gold')->default(0); // a voir quantité d'or
            $table->integer('leader_board')->default(0);
            $table->integer('number_of_pvp_battle')->default(0);
            $table->integer('battle_point')->default(0);
            $table->integer('win')->default(0);
            $table->integer('loose')->default(0);
            $table->string('avatar')->nullable();
            $table->time('play_time')->default(0);
            $table->string('email')->primary()->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->boolean('role')->default(0);
            $table->boolean('first_connexion')->default(0);
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};
