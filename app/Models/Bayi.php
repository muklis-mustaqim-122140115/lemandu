<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bayi extends Model
{
    protected $table = "bayi";
    protected $fillable = [
        "akun_id",
        "nik",
        "nama",
        "jenisKelamin",
        "umur",
        "bb",
        "tb",
        "tanggalLahir",
        "namaOrangTua",
        "nikOrangTua",
        "lk",
        "ll",
        "keterangan"
    ];
}
