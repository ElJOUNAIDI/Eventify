<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request)
    {
        // Validation
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Tentative de login
        if (!Auth::attempt($request->only('email','password'))) {
            return response()->json([
                'message' => 'Invalid credentials.'
            ], 401);
        }

        $user = $request->user();

        // Création d'un token Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User logged in successfully.',
            'user' => $user,
            'token' => $token,
        ], 200);
    }

    /**
     * Logout (invalidate tokens)
     */
    public function destroy(Request $request)
    {
        $user = $request->user();

        // Supprime tous les tokens de l'utilisateur
        $user->tokens()->delete();

        return response()->json([
            'message' => 'Logged out successfully.'
        ], 200);
    }
}
