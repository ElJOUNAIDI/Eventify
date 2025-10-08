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
        'image',
        'user_id',
    ];

    // 🔹 Lien avec l'organisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // ❌ Ancien lien (par table pivot) — tu peux le garder si tu veux encore l’utiliser
    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    // ✅ Nouveau lien vers les inscriptions
    public function registrations()
    {
        return $this->hasMany(EventRegistration::class);
    }
}
