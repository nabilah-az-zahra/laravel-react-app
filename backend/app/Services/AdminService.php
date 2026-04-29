<?php

namespace App\Services;

use App\Interfaces\AdminRepositoryInterface;

class AdminService
{
    public function __construct(
        protected AdminRepositoryInterface $adminRepository
    ) {}

    public function getAll()
    {
        return $this->adminRepository->getAll();
    }

    public function getById(int $id)
    {
        return $this->adminRepository->getById($id);
    }

    public function create(array $data)
    {
        return $this->adminRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->adminRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->adminRepository->delete($id);
    }
}