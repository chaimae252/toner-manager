<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;
    protected $table = 'locations';
    protected $primaryKey = 'id_location';
    protected $fillable = ['name'];
    // Location.php
    public function printers()
    {
        return $this->hasMany(Printer::class, 'location_id', 'id_location');
    }
}
