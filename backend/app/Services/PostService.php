<?php

namespace App\Services;

use App\Interfaces\PostRepositoryInterface;
use Illuminate\Support\Facades\Storage;

class PostService
{
    public function __construct(
        protected PostRepositoryInterface $postRepository
    ) {}

    public function getAll()
    {
        return $this->postRepository->getAll();
    }

    public function getById(int $id)
    {
        return $this->postRepository->getById($id);
    }

    public function create(array $data, $image = null)
    {
        if ($image) {
            $data['image'] = $image->store('posts', 'public');
        }

        return $this->postRepository->create($data);
    }

    public function update(int $id, array $data, $image = null)
    {
        if ($image) {
            $existing = $this->postRepository->getById($id);
            if ($existing->image) {
                Storage::disk('public')->delete($existing->image);
            }
            $data['image'] = $image->store('posts', 'public');
        }

        return $this->postRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        $existing = $this->postRepository->getById($id);
        if ($existing->image) {
            Storage::disk('public')->delete($existing->image);
        }

        return $this->postRepository->delete($id);
    }
}