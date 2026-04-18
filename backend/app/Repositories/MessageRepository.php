<?php

namespace App\Repositories;

use App\Interfaces\MessageRepositoryInterface;
use App\Models\Message;

class MessageRepository implements MessageRepositoryInterface
{
    public function getAll()
    {
        return Message::latest()->get();
    }

    public function getById(int $id)
    {
        return Message::findOrFail($id);
    }

    public function create(array $data)
    {
        return Message::create($data);
    }

    public function markAsRead(int $id)
    {
        $message = Message::findOrFail($id);
        $message->update(['is_read' => true]);
        return $message;
    }

    public function delete(int $id)
    {
        $message = Message::findOrFail($id);
        $message->delete();
    }
}