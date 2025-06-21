<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Printer extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'serial_number', 'type', 'location_id'];
    protected $primaryKey = 'id_printer';
    public function location()
    {
        return $this->belongsTo(Location::class, 'location_id', 'id_location');
    }


    public function toners()
    {
        return $this->hasMany(Toner::class);
    }

    public function requests()
    {
        return $this->hasMany(Request::class);
    }
}
