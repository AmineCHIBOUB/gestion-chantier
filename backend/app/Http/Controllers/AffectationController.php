<?php

namespace App\Http\Controllers;
use App\Models\Affectation;
use Illuminate\Http\Request;

class AffectationController extends Controller
{
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'date_debut' => 'required|date',
            'date_fin' => 'required|date',
            'user' => 'required|numeric',
            'chantier' => 'required|numeric',
        ]);

        $affectation = Affectation::create($this->toColumns($validatedData));

        return response()->json(['message' => 'Affectation created successfully', 'data' => $affectation]);
    }

    public function update(Request $request, $id)
    {
        $affectation = Affectation::findOrFail($id);

        $validatedData = $request->validate([
            'date_debut' => 'required|date',
            'date_fin' => 'required|date',
            'user' => 'required|numeric',
            'chantier' => 'required|numeric',
        ]);

        $affectation->update($this->toColumns($validatedData));

        return response()->json(['message' => 'Affectation updated successfully', 'data' => $affectation]);
    }

    private function toColumns(array $data): array
    {
        return [
            'date_debut' => $data['date_debut'],
            'date_fin' => $data['date_fin'],
            'userIdUser' => $data['user'],
            'chantierIdChantier' => $data['chantier'],
        ];
    }

    public function delete($id)
    {
        $affectation = Affectation::findOrFail($id);
        $affectation->delete();

        return response()->json(['message' => 'Affectation deleted successfully']);
    }

    public function show($id)
    {

        $affectation = Affectation::with('user','chantier')->findOrFail($id);
        return response()->json(['data' => $affectation]);
    }

    public function index()
    {
        $affectations = Affectation::with("chantier","user")->get();

        return response()->json(['data' => $affectations]);
    }

    public function getByUser($id)
    {
        $affectations = Affectation::with('user')->where('userIdUser', $id)->get();

        return response()->json(['data' => $affectations]);
    }
}
