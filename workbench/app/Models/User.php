<?php

declare(strict_types=1);

namespace Workbench\App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * Fake user model for workbench development.
 * This allows testing modules that require authentication.
 */
final class User extends Authenticatable
{
    protected $fillable = [
        'id',
        'name',
        'email',
    ];

    protected $guarded = [];

    /**
     * Disable database requirement - user exists only in memory.
     */
    public function getConnectionName(): ?string
    {
        return null;
    }
}
