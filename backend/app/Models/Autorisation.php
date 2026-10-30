<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Autorisation extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "autorisation";
    protected $primaryKey="id_autorisation";
    protected $fillable = ['chantier', 'label'];
}
