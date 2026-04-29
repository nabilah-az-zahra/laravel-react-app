<?php

namespace App\Services;

use App\Interfaces\DoctorRepositoryInterface;
use Illuminate\Support\Facades\Storage;

class DoctorService
{
    public function __construct(
        protected DoctorRepositoryInterface $doctorRepository
    ) {}

    public function getAll()
    {
        return $this->doctorRepository->getAll();
    }

    public function getBySpecialization(string $specialization)
    {
        return $this->doctorRepository->getBySpecialization($specialization);
    }

    public function getById(int $id)
    {
        return $this->doctorRepository->getById($id);
    }

    public function create(array $data, $photo = null)
    {
        if ($photo) {
            $data['photo'] = $photo->store('doctors', 'public');
        }
        return $this->doctorRepository->create($data);
    }

    public function update(int $id, array $data, $photo = null)
    {
        if ($photo) {
            $existing = $this->doctorRepository->getById($id);
            if ($existing->photo) {
                Storage::disk('public')->delete($existing->photo);
            }
            $data['photo'] = $photo->store('doctors', 'public');
        }
        return $this->doctorRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        $existing = $this->doctorRepository->getById($id);
        if ($existing->photo) {
            Storage::disk('public')->delete($existing->photo);
        }
        return $this->doctorRepository->delete($id);
    }
}