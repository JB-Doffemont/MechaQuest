<?php

namespace Tests\Unit;

use App\Models\Robot;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Models\User;




class RobotTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_if_robot_get_registered_without_login()
    {

        $robot = $this->post('api/robots', [

            'robot_name' => Str::random(10),
            'type_robot' => Db::table('types')->inRandomOrder()->first()->type_name,
            'reward' => random_int(0, 10000),
            'price' => random_int(0, 10000),
        ]);

        $robot->assertJsonStructure([
            'robot_name',
            'type_robot',
            'reward',
            'price'
        ])
            ->assertStatus(201);
    }

    public function test_if_robot_get_registered()
    {
        $user = User::where('email', 'admin@admin.com')->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        $userAdmin = $this->post('api/login', [
            'email' => 'admin@admin.com',
            'password' => 'admin',
        ]);

        $userAdmin->assertJsonStructure([
            'access_token',
            'token_type',
        ]);

        if ($user->role === 1) {
            $robot = $this->post('api/robots', [

                'robot_name' => Str::random(10),
                'type_robot' => Db::table('types')->inRandomOrder()->first()->type_name,
                'reward' => random_int(0, 10000),
                'price' => random_int(0, 10000),
            ]);


            $robot->assertJsonStructure([
                'robot_name',
                'type_robot',
                'reward',
                'price'
            ])
                ->assertStatus(201);
        }
    }
}
