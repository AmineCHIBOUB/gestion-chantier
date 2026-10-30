<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chantier extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "chantier";
    protected $primaryKey="id_Chantier";
    protected $fillable = ['nom_chantier', 'localisation'];

}
