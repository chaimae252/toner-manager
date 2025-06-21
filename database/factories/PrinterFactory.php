<?php

namespace Database\Factories;

use App\Models\Location;
use App\Models\Printer;
use Illuminate\Database\Eloquent\Factories\Factory;

class PrinterFactory extends Factory
{
    protected $model = Printer::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->company . ' Printer',
            'serial_number' => strtoupper($this->faker->bothify('??##-##??')),
            'type' => $this->faker->randomElement(['Laser', 'Inkjet', 'Thermal']),
            'location_id' => Location::factory(),
        ];
    }
}
