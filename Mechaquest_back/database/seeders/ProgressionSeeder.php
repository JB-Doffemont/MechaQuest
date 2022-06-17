<?php

namespace Database\Seeders;

use App\Models\Progression;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Factories\ProgressionFactory;

class ProgressionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Progression::factory(4)->create();
    }
}
