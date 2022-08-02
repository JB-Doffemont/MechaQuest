<?php

namespace Tests\Unit;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    /*public function test_if_user_get_registered()
    {

        $user = $this->post('api/register', [
            'pseudo' => Str::random(10),
            'email' => Str::random(10) . "@gmail.com",
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'

        ]);

        $user->assertJsonStructure([
            'pseudo',
            'email'
        ])
            ->assertStatus(201);
    }*/

    public function test_if_user_can_login()
    {

        $response = $this->post('api/login', [
            'email' => 'lucas9@a.fr',
            'password' => 'adminadmin'
        ]);


        $response->assertJsonStructure([
            'access_token',
            'token_type',
        ])
            ->assertStatus(200);
    }

    public function test_user_duplication()
    {
        $user1 = User::make([
            'pseudo' => 'Dary',
            'email' => 'dary@gmail.com'
        ]);

        $user2 = User::make([
            'pseudo' => 'John',
            'email' => 'john@gmail.com'
        ]);

        $this->assertTrue($user1->pseudo != $user2->pseudo);
    }


    // public function test_delete_user()
    // {

    //     $user = User::factory()->count(1)->make();

    //     $user = User::first();


    //     if ($user) {
    //         foreach ($user->robots as $robot) {
    //             $robot->delete();
    //         }
    //         $user->delete();
    //     }

    //     $this->assertTrue(true);
    // }
}
