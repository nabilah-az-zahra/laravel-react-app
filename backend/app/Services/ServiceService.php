<?php

namespace App\Services;

use App\Interfaces\ServiceRepositoryInterface;
use Illuminate\Support\Facades\Storage;

class ServiceService
{
    public function __construct(
        protected ServiceRepositoryInterface $serviceRepository
    ) {}

    public function getAll()
    {
        return $this->serviceRepository->getAll();
    }

    public function getById(int $id)
    {
        return $this->serviceRepository->getById($id);
    }

    public function create(array $data, $image = null)
    {
        if ($image) {
            $data['image'] = $image->store('services', 'public');
        }
        return $this->serviceRepository->create($data);
    }

    public function update(int $id, array $data, $image = null)
    {
        if ($image) {
            $existing = $this->serviceRepository->getById($id);
            if ($existing->image) {
                Storage::disk('public')->delete($existing->image);
            }
            $data['image'] = $image->store('services', 'public');
        }
        return $this->serviceRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        $existing = $this->serviceRepository->getById($id);
        if ($existing->image) {
            Storage::disk('public')->delete($existing->image);
        }
        return $this->serviceRepository->delete($id);
    }
}