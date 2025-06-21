<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable; // <-- Important
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Admin extends Authenticatable
{
    use HasFactory;

    protected $guard = 'admin'; // This is optional but useful

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function requests()
    {
        return $this->hasMany(Request::class);
    }
}
