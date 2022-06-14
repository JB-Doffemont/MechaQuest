<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class RobotFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition()
    {
        return [
            'robot_name' => $this->faker->name(),
            'user_email' => Db::table('users')->inRandomOrder()->first()->email,
            'type_robot' => Db::table('types')->inRandomOrder()->first()->type_name,
            'main_robot' => $this->faker->boolean(),
            'current_hp' => $this->faker->numerify('######'),
            'current_atk' => $this->faker->numerify('#####'),
            'current_def' => $this->faker->numerify('#####'),
            'current_def' => $this->faker->numerify('#####'),
            'current_stam' => $this->faker->numerify('###'),
            'current_lvl' => $this->faker->numerify('####'),
            'current_xp' => $this->faker->numerify('####'),
            'reward' => $this->faker->numerify('####'),
            'price' => $this->faker->numerify('####'),
        ];
    }
}
