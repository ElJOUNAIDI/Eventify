<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category',
        'location',
        'start_date',
        'end_date',
        'available_seats',
        'user_id',
    ];

    // Lien avec l'organisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Lien avec les utilisateurs inscrits
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
