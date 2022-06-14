<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class TypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'type_name' => Str::random(6),
            'base_hp' => $this->faker->numerify('######'),
            'base_atk' => $this->faker->numerify('######'),
            'base_def' => $this->faker->numerify('######'),
            'special' => Str::random(10),
        ];
    }
}
