<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
 public function run(): void
{
    \App\Models\Location::factory(5)->create();
    \App\Models\Printer::factory(10)->create();
    User::factory(5)->create();
    \App\Models\Admin::factory(2)->create();
    \App\Models\Stock::factory(3)->create();
    \App\Models\Toner::factory(20)->create();
    \App\Models\Request::factory(10)->create();
    $this->call(AdminSeeder::class);
}


}
