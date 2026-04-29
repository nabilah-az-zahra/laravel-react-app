<?php

namespace App\Repositories;

use App\Interfaces\DoctorRepositoryInterface;
use App\Models\Doctor;

class DoctorRepository implements DoctorRepositoryInterface
{
    public function getAll()
    {
        return Doctor::latest()->get();
    }

    public function getBySpecialization(string $specialization)
    {
        return Doctor::where('specialization', $specialization)->get();
    }

    public function getById(int $id)
    {
        return Doctor::findOrFail($id);
    }

    public function create(array $data)
    {
        return Doctor::create($data);
    }

    public function update(int $id, array $data)
    {
        $doctor = Doctor::findOrFail($id);
        $doctor->update($data);
        return $doctor;
    }

    public function delete(int $id)
    {
        $doctor = Doctor::findOrFail($id);
        $doctor->delete();
    }
}