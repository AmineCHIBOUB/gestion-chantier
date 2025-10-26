<?php

namespace App\Http\Controllers;
use App\Models\TypeUser;
use Illuminate\Http\Request;

class TypeUserController extends Controller
{
    public function index()
    {
        $typeUsers = TypeUser::all();
        
        return response()->json($typeUsers, 200);
    }
    public function create(Request $request)
    {
        $request->validate([
            'label' => ['required', 'string', Rule::unique('type_users')]
        ]);

        $typeUser = TypeUser::create([
            'label' => $request->input('label')
        ]);

        return response()->json($typeUser, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'label' => ['required', 'string', Rule::unique('type_users')->ignore($id, 'id_type')]
        ]);

        $typeUser = TypeUser::findOrFail($id);
        $typeUser->update($request->all());

        return response()->json($typeUser, 200);
    }

    public function delete($id)
    {
        $typeUser = TypeUser::findOrFail($id);
        $typeUser->delete();

        return response()->json(null, 204);
    }

    public function getById($id)
    {
        $typeUser = TypeUser::findOrFail($id);

        return response()->json($typeUser, 200);
    }
}
