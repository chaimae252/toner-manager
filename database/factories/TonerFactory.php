<?php

namespace Database\Factories;

use App\Models\Printer;
use App\Models\Stock;
use App\Models\Toner;
use Illuminate\Database\Eloquent\Factories\Factory;

class TonerFactory extends Factory
{
    protected $model = Toner::class;

    public function definition()
    {
        return [
            'stock_id' => Stock::factory(),         // Link to stocks (which has code & color)
            'printer_id' => Printer::factory(),
            'yield_pages' => $this->faker->numberBetween(1000, 10000),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
