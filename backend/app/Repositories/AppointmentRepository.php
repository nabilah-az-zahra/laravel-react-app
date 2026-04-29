<?php

namespace App\Repositories;

use App\Interfaces\AppointmentRepositoryInterface;
use App\Models\Appointment;

class AppointmentRepository implements AppointmentRepositoryInterface
{
    public function getAll()
    {
        return Appointment::with('doctor')->latest()->get();
    }

    public function getById(int $id)
    {
        return Appointment::with('doctor')->findOrFail($id);
    }

    public function create(array $data)
    {
        return Appointment::create($data);
    }

    public function updateStatus(int $id, string $status)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->update(['status' => $status]);
        return $appointment;
    }

    public function delete(int $id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->delete();
    }
}