<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    protected $fillable = [
        "jenis",
        "label",
        "akun_id"
    ];
}
