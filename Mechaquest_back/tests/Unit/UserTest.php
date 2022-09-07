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
    public function test_if_user_get_registered()
    {
        $user = $this->post('api/register', [
            'pseudo' => Str::random(10),
            'email' => Str::random(10) . "@gmail.com",
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'

        ]);

        $user->assertJsonStructure([
            [
                'pseudo',
                'email'
            ]
        ])
            ->assertStatus(200);
    }

    public function test_if_user_not_registered_pseudo_invalid()
    {

        $user = $this->post('api/register', [
            'pseudo' => 'Jérome%:/',
            'email' => Str::random(10) . "@gmail.com",
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'

        ]);

        $user->assertStatus(422);
    }

    public function test_if_user_not_registered_email_invalid()
    {

        $user = $this->post('api/register', [
            'pseudo' => Str::random(10),
            'email' => Str::random(10) . "gmail.com",
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'

        ]);

        $user->assertStatus(422);
    }

    public function test_if_user_not_registered_password_invalid()
    {

        $user = $this->post('api/register', [
            'pseudo' => Str::random(10),
            'email' => Str::random(10) . "@gmail.com",
            'password' => 'Fail'

        ]);

        $user->assertStatus(422);
    }

    public function test_if_user_can_login()
    {

        $user = $this->post('api/login', [
            'email' => 'jbABCDE@gmail.com',
            'password' => '12345678'
        ]);

        $user->assertJsonStructure(
            [
                'access_token',
                'token_type'
            ]
        )->assertStatus(200);
    }

    public function test_if_invalid_login_details()
    {
        $user = $this->post('api/login', [
            'email' => 'dary1116@gmail.com',
            'password' => 'dary1234556'
        ]);

        $user->assertStatus(401);
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

    public function test_success_delete_user_and_his_robots()
    {
        $admin = $this->post('api/login', [
            'email' => 'jbABCDE@gmail.com',
            'password' => '12345678'
        ]);

        $admin->assertJsonStructure(
            [
                'access_token',
                'token_type'
            ]
        );

        $user = User::where("email", "lbecker@example.com")->first();


        if (!empty($user)) {
            foreach ($user->robots as $robot) {
                $robot->delete();
            }
            $response = $this->delete('api/users/' . $user->email);
        }



        $response->assertStatus(200);
        $this->assertTrue(true);
    }

    public function test_delete_user_and_his_robots_not_admin()

    {
        $this->post('api/login', [
            'email' => 'jbaaa@gmail.com',
            'password' => '12345678'
        ]);

        $response = $this->delete('api/users/' . "pkovacek@example.net");

        // Redirection cause sanctum
        $response->assertStatus(302);
    }
    public function test_delete_user_and_his_robots_already_deleted()

    {
        $this->post('api/login', [
            'email' => 'jbABCDE@gmail.com',
            'password' => '12345678'
        ]);

        $response = $this->delete('api/users/' . "pkovacek@example.net");

        $response->assertStatus(404);
    }
}
