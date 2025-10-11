<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Auth;
use App\Models\EventRegistration;

class EventController extends Controller
{
    public function index()
    {
        return Event::with('user')->paginate(10);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'available_seats' => 'required|integer|min:1',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('events', 'public');
        }

        $event = Event::create(array_merge($data, ['user_id' => Auth::id()]));

        return response()->json($event, 201);
    }

    public function show(Event $event)
    {
        return $event->load('user', 'users');
    }

    public function update(Request $request, Event $event)
    {
        $user = Auth::user();

        // 🔹 Autoriser l'organisateur ou l'admin à modifier
        if ($event->user_id !== $user->id && $user->role !== 'admin') {
            return response()->json(['error' => 'Accès refusé'], 403);
        }

        $event->update($request->all());
        return response()->json($event);
    }

    public function destroy(Event $event)
    {
        $user = Auth::user();

        // 🔹 Autoriser seulement l'organisateur propriétaire ou l'admin
        if ($event->user_id !== $user->id && $user->role !== 'admin') {
            return response()->json(['error' => 'Accès refusé'], 403);
        }

        $event->delete();

        return response()->json(['message' => '✅ Événement supprimé avec succès']);
    }

    public function register(Request $request, Event $event)
    {
        $user = Auth::user();

        if (
            EventRegistration::where('event_id', $event->id)
                ->where('user_id', $user->id)
                ->exists()
        ) {
            return response()->json(['message' => 'Déjà inscrit à cet événement.'], 400);
        }

        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone_number' => 'required|string|max:20',
            'location' => 'nullable|string|max:255',
        ]);

        $registration = EventRegistration::create([
            'event_id' => $event->id,
            'user_id' => $user->id,
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
            'phone_number' => $validated['phone_number'],
            'location' => $validated['location'] ?? $event->location,
            'category' => $event->category ?? null,
            'image' => $event->image ?? null,
        ]);

        return response()->json([
            'message' => 'Inscription réussie',
            'registration' => $registration
        ], 201);
    }
}
