<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Toner extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_toner'; // <--- Make sure this is set since your PK is not "id"
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'stock_id',
        'printer_id',
    ];

    public function stock()
    {
        return $this->belongsTo(Stock::class, 'stock_id');
    }

    public function printer()
    {
        return $this->belongsTo(Printer::class, 'printer_id', 'id_printer')->with('location');
    }

    public function request()
    {
        return $this->belongsTo(Request::class);
    }
}
