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

        // Key admin: 38|rtdXRgQE73PsHhDzt1DrYE1YECJY9eZAttodo81v

        $response = $this->post('api/login', [
            'email' => 'lucas9@a.fr',
            'password' => 'adminadmin'
        ]);


        $response->assertJsonStructure([
            'access_token',
            'token_type',
        ])
            ->assertStatus(200);

        // Si l'access_token appartient à un admin, la création de robot est alors possible
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
            'price',
            'updated_at',
            'created_at',

        ])
            ->assertStatus(201);
    }
}
