<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;
    protected $fillable = ['code', 'color', 'quantity'];
    protected $primaryKey = 'id_stock'; // 👈 tell Laravel the real PK
    public $incrementing = true;
    protected $keyType = 'int';

    public function toners()
    {
        return $this->hasMany(Toner::class);
    }
    public function availableToners()
    {
        return $this->hasMany(\App\Models\Toner::class, 'stock_id', 'id_stock')
            ->whereNull('printer_id');
    }
}
