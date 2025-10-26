<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Model;

class User  extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    // Rest of your User model code...

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public $timestamps = false;
    protected $table = "users";
    protected $primaryKey="id_user";
    protected $fillable = ['name', 'prenom', 'cin', 'email', 'password', 'activeSession', 'restraction'];
    public function pointages()
    {
        return $this->hasMany(Pointage::class, 'userIdUser', 'id');
    }
    public function demandesconges()
    {
        return $this->hasMany(Demandeconge::class, 'userIdUser', 'id_user');
    }

    public function typeUser()
    {
        return $this->belongsTo(TypeUser::class, 'typeUserIdType','id_type');
    }

   public function getJWTCustomClaims()
   {
       return [];
   }

   public function chantiers()
   {
       return $this->belongsToMany(Chantier::class, 'user_id', 'chantier_id');
   }
}
