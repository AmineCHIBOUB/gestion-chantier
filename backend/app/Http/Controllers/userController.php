<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;
class UserController extends Controller
{
    public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::with("typeUser")->where('email', $request->email)->first();
    if(!$user){
        return response()->json(["message"=>"email est incorrect","error"=>true]);
    }
    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(["message"=>"password est incorrect","error"=>true]);
    }

    $token = JWTAuth::fromUser($user);

    // Store the token in the database
    $user->update(['activeSession' => $token]);

    return response()->json(['token' => $token, 'user' => $user,"error"=>false]);
}

    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'prenom' => 'required|string',
            'cin' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = User::create($validatedData);

        return response()->json(['message' => 'User created successfully', 'user' => $user,"error"=>false], 201);
    }

    public function logout(Request $request)
    {
        $request->user()->update(['activeSession' => null]);
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['message' => 'User logged out successfully']);
    }

    public function verifyToken(Request $request)
    {
        return response()->json(['valid' => true]);
    }
    
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'prenom' => 'required|string',
            'cin' => 'required|string|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = User::create($validatedData);

        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'string',
            'prenom' => 'string',
            'cin' => 'string|unique:users,cin,'.$user->id_user.',id_user',
            'email' => 'email|unique:users,email,'.$user->id_user.',id_user',
            'password' => 'string|min:8',
        ]);

        if ($request->has('password')) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }

        $user->update($validatedData);

        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json(['user' => $user]);
    }


    public function delete($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }


    public function index()
    {
        $users = User::with("typeUser")->get();
        return response()->json(['users' => $users,"error"=>false]);
    }

    public function chantiersUtilisateur($id)
    {
        // Récupérer l'utilisateur avec les chantiers associés
        $user = User::with('chantiers')->findOrFail($id);
        
        // Maintenant, vous pouvez accéder aux chantiers de l'utilisateur
        $chantiers = $user->chantiers;

        // Retourner les chantiers associés à l'utilisateur
        return response()->json(['chantiers' => $chantiers, "error" => false]);
    }
}
