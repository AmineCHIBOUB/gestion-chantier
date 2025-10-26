<?php

namespace App\Http\Controllers;
use App\Models\Chantier;
use Illuminate\Http\Request;

class ChantierController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'nom_chantier' => 'required|string',
        ]);

        $chantier = Chantier::create($request->all());

        return response()->json(['error' => false, 'message' => 'Chantier bien ajouté', 'chantier' => $chantier]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nom_chantier' => 'required|string',
            'localisation' => 'required|string',
        ]);

        $chantier = Chantier::findOrFail($id);
        $chantier->update($request->all());

        return response()->json(['error' => false, 'message' => 'Chantier mis à jour', 'chantier' => $chantier]);
    }

    public function delete($id)
    {
        $chantier = Chantier::findOrFail($id);
        $chantier->delete();

        return response()->json(['error' => false, 'message' => 'Chantier supprimé']);
    }

    public function getChantierById($id)
    {
        $chantier = Chantier::findOrFail($id);

        return response()->json($chantier);
    }

    public function getAllChantiers()
    {
        $chantiers = Chantier::all();

        return response()->json($chantiers);
    }
}
