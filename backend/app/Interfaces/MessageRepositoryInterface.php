<?php

namespace App\Interfaces;

interface MessageRepositoryInterface
{
    public function getAll();
    public function getById(int $id);
    public function create(array $data);
    public function markAsRead(int $id);
    public function delete(int $id);
}