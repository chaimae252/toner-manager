<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    use HasFactory;

    // Match your table's primary key since it’s not 'id'
    protected $primaryKey = 'id_request';

    // Fillable columns that can be mass assigned
    protected $fillable = [
        'full_name',
        'printer_id',
        'stock_id',   // NOT 'toner_id' — your table uses stock_id!
        'note',
        'status',
    ];

    // Relationships

    public function printer()
    {
        // Specify foreign key and local key for clarity
        return $this->belongsTo(Printer::class, 'printer_id', 'id_printer');
    }

    public function stock()
    {
        // Since your column is stock_id, and model is Stock
        return $this->belongsTo(Stock::class, 'stock_id', 'id_stock');
    }

    // Optional: if you want an admin relation and have admin_id column
    // public function admin()
    // {
    //     return $this->belongsTo(Admin::class, 'admin_id');
    // }
}
