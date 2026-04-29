<?php

namespace App\Repositories;

use App\Interfaces\ServiceRepositoryInterface;
use App\Models\Service;

class ServiceRepository implements ServiceRepositoryInterface
{
    public function getAll()
    {
        return Service::latest()->get();
    }

    public function getById(int $id)
    {
        return Service::findOrFail($id);
    }

    public function create(array $data)
    {
        return Service::create($data);
    }

    public function update(int $id, array $data)
    {
        $service = Service::findOrFail($id);
        $service->update($data);
        return $service;
    }

    public function delete(int $id)
    {
        $service = Service::findOrFail($id);
        $service->delete();
    }
}