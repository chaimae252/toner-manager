<?php

namespace Database\Factories;

use App\Models\Toner;
use App\Models\User;
use App\Models\Request;
use Illuminate\Database\Eloquent\Factories\Factory;

class RequestFactory extends Factory
{
    protected $model = Request::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'toner_id' => Toner::factory(),
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
            'note' => $this->faker->optional()->sentence(),
        ];
    }
}
