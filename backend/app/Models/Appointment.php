<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'gender',
        'birth_date',
        'phone',
        'email',
        'address',
        'doctor_id',
        'appointment_date',
        'appointment_time',
        'symptoms',
        'status',
        'notes',
    ];

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }
}