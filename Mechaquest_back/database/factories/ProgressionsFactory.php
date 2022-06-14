<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProgressionsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'lvl' => $this->faker->numerify('######'),
            'min_xp' => $this->faker->numerify('######'),
            'max_xp' => $this->faker->numerify('######'),
        ];
    }
}
