<?php

namespace App\Services;

use App\Interfaces\AppointmentRepositoryInterface;

class AppointmentService
{
    public function __construct(
        protected AppointmentRepositoryInterface $appointmentRepository
    ) {}

    public function getAll()
    {
        return $this->appointmentRepository->getAll();
    }

    public function getById(int $id)
    {
        return $this->appointmentRepository->getById($id);
    }

    public function create(array $data)
    {
        return $this->appointmentRepository->create($data);
    }

    public function updateStatus(int $id, string $status)
    {
        return $this->appointmentRepository->updateStatus($id, $status);
    }

    public function delete(int $id)
    {
        return $this->appointmentRepository->delete($id);
    }
}