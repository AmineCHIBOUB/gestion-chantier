<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\TypeUserController;
use App\Http\Controllers\PointageController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\HabiliteController;
use App\Http\Controllers\DemandecongeController;
use App\Http\Controllers\AutorisationController;
use App\Http\Controllers\AffectationController;
use App\Http\Controllers\ChantierController;
use Illuminate\Support\Facades\Route;

// Route publique : connexion
Route::post('user/login', [UserController::class, 'login']);

// Toutes les autres routes demandent un jeton JWT valide
Route::middleware('auth:api')->group(function () {

Route::post('user/register', [UserController::class, 'register']);
Route::post('user/logout', [UserController::class, 'logout']);
Route::post('user/verifyToken', [UserController::class, 'verifyToken']);

// Routes pour la gestion des utilisateurs
Route::get('/user', [UserController::class, 'index']);
Route::post('/user/create', [UserController::class, 'create']);
Route::get('/user/{id}', [UserController::class, 'show']);
Route::put('/user/{id}', [UserController::class, 'update']);
Route::delete('/user/{id}', [UserController::class, 'delete']);
Route::get('/users/{id}/chantiers', [UserController::class, 'chantiersUtilisateur']);

Route::get('/type-user', [TypeUserController::class, 'index']);
Route::post('/type-user/create', [TypeUserController::class, 'create']);
Route::put('/type-user/update/{id}', [TypeUserController::class, 'update']);
Route::delete('/type-user/delete/{id}', [TypeUserController::class, 'delete']);
Route::get('/type-user/{id}', [TypeUserController::class, 'getById']);

Route::post('/pointage', [PointageController::class, 'create']);
Route::get('/pointage', [PointageController::class, 'getAll']);

Route::get('/plans', [PlanController::class, 'index']);
Route::get('/plans/{id}', [PlanController::class, 'show']);
Route::post('/plans', [PlanController::class, 'store']);
Route::put('/plans/{id}', [PlanController::class, 'update']);
Route::delete('/plans/{id}', [PlanController::class, 'destroy']);

Route::prefix('notification')->group(function () {
    Route::post('', [NotificationController::class, 'create']);
    Route::get('', [NotificationController::class, 'getAll']);
});
Route::prefix('habilite')->group(function () {
    Route::get('/{userIdUser}', [HabiliteController::class, 'index']);
    Route::get('/HabiliteUploads/{id}', [HabiliteController::class, 'show']);
    Route::get('/HabiliteUploads/{filename}', [HabiliteController::class, 'downloadFile']);
    Route::post('/', [HabiliteController::class, 'store']);
    Route::put('/{id}', [HabiliteController::class, 'update']);
    Route::delete('/{id}', [HabiliteController::class, 'destroy']);
});
Route::post('/demandeconge/create', [DemandecongeController::class, 'create']);
Route::put('/demandeconge/annulation', [DemandecongeController::class, 'annulation']);
Route::put('/demandeconge/refuser', [DemandecongeController::class, 'refuser']);
Route::put('/demandeconge/validation', [DemandecongeController::class, 'validation']);
Route::get('/demandeconge', [DemandecongeController::class, 'getconge']);
Route::get('/demandeconge/{id}', [DemandecongeController::class, 'getcongbyid']);

Route::post('/chantier/create', [ChantierController::class, 'create']);
Route::put('/chantier/update/{id}', [ChantierController::class, 'update']);
Route::delete('/chantier/{id}', [ChantierController::class, 'delete']);
Route::get('/chantier/{id}', [ChantierController::class, 'getChantierById']);
Route::get('/chantiers', [ChantierController::class, 'getAllChantiers']);

Route::get('/autorisation', [AutorisationController::class, 'index']);
Route::get('/autorisation/{id}', [AutorisationController::class, 'show']);
Route::post('/autorisation', [AutorisationController::class, 'store']);
Route::put('/autorisation/{id}', [AutorisationController::class, 'update']);
Route::delete('/autorisation/{id}', [AutorisationController::class, 'destroy']);

Route::post('/affectations', [AffectationController::class, 'create']);
Route::put('/affectations/{id}', [AffectationController::class, 'update']);
Route::delete('/affectations/{id}', [AffectationController::class, 'delete']);
Route::get('/affectations/{id}', [AffectationController::class, 'show']);
Route::get('/affectations', [AffectationController::class, 'index']);
Route::get('/affectations/user/{id}', [AffectationController::class, 'getByUser']);

});