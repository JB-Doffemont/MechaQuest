<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function register(Request $request)
    {

        // Création d'une instance permettant de personnaliser la vérification des données, la reponse et son statut
        $validated = Validator::make($request->all(), [
            'pseudo' => 'required|alpha_num|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);
        if ($validated->fails()) {
            return response()->json([
                'pseudo' => 'Le pseudo ne peut contenir que des lettres et des chiffres.',
                'email' => 'L\'email doit être une adresse valide.',
                'password' => 'Le mot de passe doit contenir au moins 8 caractères.'

            ], 422);
            //return response()->json($validated->errors(), 422);
        }

        // Récupération des entrées validées
        $validatedData = $validated->validated();

        $user = User::create([
            'pseudo' => $validatedData['pseudo'],
            'email' => $validatedData['email'],
            'password' => $validatedData['password'],
        ]);

        return response()->json([$user, 'status_code' => 200]);
    }

    public function login(Request $request)
    {
        // Message d'erreur si l'email ou le mot de passe ne sont pas valides
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'email' => 'L\'email n\'est pas valide.',
                'password' => 'Le mot de passe n\'est pas valide.',
            ], 401);
        }

        // Récupération de l'email de l'utilisateur
        $user = User::where('email', $request['email'])->firstOrFail();

        // Création d'un token d'authentification
        $token = $user->createToken('auth_token')->plainTextToken;

        // La réponse renvoit un json avec un Bearer Token
        return response()->json(
            [
                'access_token' => $token,
                'token_type' => 'Bearer',
                'status_code' => 200
            ]
        );
    }

    // Suppression de l'access_token de l'utilisateur pour le déconnecter
    public function logout()
    {
        $user = request()->user();
        $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();

        // $request->user()->currentAccessToken()->delete();

        // $user = Auth::user()->token();
        // $user->revoke();

        return response()->json("Vous êtes déconnecté");
    }
}
