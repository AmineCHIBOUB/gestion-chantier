<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Habilite extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "habilite";
    protected $primaryKey="id_habilite";
    protected $fillable = ['userIdUser', 'label'];
}
