<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lansia extends Model
{
    protected $table = "lansia";
    protected $fillable = [
        "akun_id",
        "nik",
        "name",
        "tanggallahir",
        "umur",
        "jeniskelamin",
        "noHp",
        "namawali",
        "telpwali",
        "alamat",
        "bb",
        "tb",
        "ll",
        "lk",
        "tensi",
        "goldar",
        "keterangan"

    ];
}
