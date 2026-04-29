<?php

namespace App\Interfaces;

interface DoctorRepositoryInterface
{
    public function getAll();
    public function getBySpecialization(string $specialization);
    public function getById(int $id);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
}