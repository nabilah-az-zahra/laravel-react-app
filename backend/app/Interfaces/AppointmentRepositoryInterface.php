<?php

namespace App\Interfaces;

interface AppointmentRepositoryInterface
{
    public function getAll();
    public function getById(int $id);
    public function create(array $data);
    public function updateStatus(int $id, string $status);
    public function delete(int $id);
}