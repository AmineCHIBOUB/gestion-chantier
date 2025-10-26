<?php

namespace App\Http\Controllers;
use App\Models\Demandeconge;
use Illuminate\Http\Request;

class DemandecongeController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'userIdUser' => 'required',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date',
        ]);

        $demande = Demandeconge::create($request->all());

        return response()->json(['error' => false, 'message' => 'Demande de congé bien ajoutée']);
    }

    public function annulation(Request $request)
    {
        $request->validate([    
            'id_demande' => 'required',
            'annulation' => 'required',
        ]);

        Demandeconge::findOrFail($request->id_demande)->update(['annulation' => $request->annulation]);

        return response()->json(['error' => false, 'message' => 'Demande bien annulée']);
    }

    public function refuser(Request $request)
    {
        $request->validate([
            'id_demande' => 'required',
            'refuser' => 'required',
        ]);

        Demandeconge::findOrFail($request->id_demande)->update(['refuser' => $request->refuser]);

        return response()->json(['error' => false, 'message' => 'Demande bien refusée']);
    }

    public function validation(Request $request)
    {
        $request->validate([
            'id_demande' => 'required',
            'validation' => 'required',
        ]);

        Demandeconge::findOrFail($request->id_demande)->update(['validation' => $request->validation]);

        return response()->json(['error' => false, 'message' => 'Demande bien validée']);
    }

    public function getconge()
    {
        $conge = Demandeconge::with('user')->get()->toArray();

        $congeWithoutPassword = array_map(function($demande) {
            $user = $demande['user'];
            unset($user['password'], $user['activeSession']);
            unset($demande['user']['password'], $demande['user']['activeSession']);
            $demande['user'] = $user;
            return $demande;
        }, $conge);

        return response()->json($congeWithoutPassword);
    }

    public function getcongbyid($id)
    {
        $conge = Demandeconge::whereHas('user', function ($query) use ($id) {
            $query->where('id_user', $id);
        })->get();

        return response()->json($conge);
    }
}
