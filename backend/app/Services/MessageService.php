<?php

namespace App\Services;

use App\Interfaces\MessageRepositoryInterface;

class MessageService
{
    public function __construct(
        protected MessageRepositoryInterface $messageRepository
    ) {}

    public function getAll()
    {
        return $this->messageRepository->getAll();
    }

    public function getById(int $id)
    {
        return $this->messageRepository->getById($id);
    }

    public function create(array $data)
    {
        return $this->messageRepository->create($data);
    }

    public function markAsRead(int $id)
    {
        return $this->messageRepository->markAsRead($id);
    }

    public function delete(int $id)
    {
        return $this->messageRepository->delete($id);
    }
}