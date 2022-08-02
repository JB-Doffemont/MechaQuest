<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Contracts\Support\ValidatedData;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function register(Request $request)
    {

        // Création d'une instance permettant de personnaliser la vérification des données, la reponse et son status
        $validated = Validator::make($request->all(), [
            'pseudo' => 'required|alpha_num|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);
        if ($validated->fails()) {
            return response()->json($validated->errors(), 422);
        }

        // Récupération des entrées validées
        $validatedData = $validated->validated();


        $user = User::create([
            'pseudo' => $validatedData['pseudo'],
            'email' => $validatedData['email'],
            'password' => $validatedData['password'],
        ]);

        return response()->json($user, 201);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details'
            ], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;


        $user->forceFill(['last_used_at' => now()])->save();


        return response()->json(
            [
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]
        );
    }
}
