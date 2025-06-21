<?php

namespace Database\Factories;

use App\Models\Stock;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Stock>
 */
class StockFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Stock::class;

    public function definition()
    {
        return [
            'code' => strtoupper($this->faker->bothify('??-###')),
            'color' => $this->faker->randomElement(['Black', 'Cyan', 'Magenta', 'Yellow']),
            'quantity' => $this->faker->numberBetween(5, 30),
        ];
    }
}
