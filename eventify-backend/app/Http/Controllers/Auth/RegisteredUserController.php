<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Auth\Events\Registered;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request)
    {
        // Validation
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required','string','email','max:255','unique:users'],
            'password' => ['required','confirmed', Password::defaults()],
        ]);

        // Création de l'utilisateur
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Événement Laravel pour post-register
        event(new Registered($user));

        // Création d'un token Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        // Retour JSON
        return response()->json([
            'message' => 'User registered successfully.',
            'user' => $user,
            'token' => $token,
        ], 201);
    }
}
