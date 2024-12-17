<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ibu extends Model
{
    protected $table = "ibu_hamil";
    protected $fillable = [
        "akun_id",
        "nik",
        "name",
        "tanggallahir",
        "niksuami",
        "namasuami",
        "umur",
        "telepon",
        "alamat",
        "bbsebelum",
        "bbsesudah",
        "tb",
        "goldar",
        "hemoglobin",
        "tinggifundus",
        "jadwallahir",
        "keluhan",
        "keterangan"
    ];
}
