<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Affectation extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "affectation";
    protected $primaryKey="id_affectation";
    protected $fillable = ['date_debut', 'date_fin', 'userIdUser', 'chantierIdChantier'];

    // Relation avec l'utilisateur
    public function user()
    {
        return $this->belongsTo(User::class, 'userIdUser', 'id_user');
    }

    // Relation avec le chantier
    public function chantier()
    {
        return $this->belongsTo(Chantier::class, 'chantierIdChantier', 'id_Chantier');
    }
}

