<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class AreaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => Str::random(6),
            'battle_background' => Str::random(10),
            'menu_background' => Str::random(10),
            'description' => $this->faker->sentence(),
            'number_of_battle' => $this->faker->numerify('######'),
            'reward' => $this->faker->numerify('######'),
            'required_stam' => $this->faker->numerify('######'),
        ];
    }
}
