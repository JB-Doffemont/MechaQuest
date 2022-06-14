<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class RobotPositionsBattlesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'robot_id' => Db::table('robots')->inRandomOrder()->first()->id,
            'area_name' => Db::table('areas')->inRandomOrder()->first()->name,
            'position' => $this->faker->numerify('######'),
        ];
    }
}
