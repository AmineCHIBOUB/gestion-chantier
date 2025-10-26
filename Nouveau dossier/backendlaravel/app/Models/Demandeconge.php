<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demandeconge extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "demande_conges";
    protected $primaryKey="id_demande";
    protected $fillable = ['userIdUser', 'date_debut', 'date_fin','validation','annulation','refuser'];
    public function user()
    {
        return $this->belongsTo(User::class, 'userIdUser', 'id_user');
    }
}
