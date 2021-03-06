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
            'background' => Str::random(10),
            'number_of_battle' => $this->faker->numerify('######'),
            'reward' => $this->faker->numerify('######'),
            'required_stam' => $this->faker->numerify('######'),
        ];
    }
}
