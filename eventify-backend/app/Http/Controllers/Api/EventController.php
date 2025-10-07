<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    public function index() {
        return Event::with('user')->paginate(10);
    }

    public function store(Request $request) {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'available_seats' => 'required|integer|min:1'
        ]);

        $event = Event::create(array_merge($request->all(), ['user_id' => Auth::id()]));
        return response()->json($event,201);
    }

    public function show(Event $event) {
        return $event->load('user','users');
    }

    public function update(Request $request, Event $event) {
        if($event->user_id != Auth::id()) return response()->json(['error'=>'Unauthorized'],403);

        $event->update($request->all());
        return response()->json($event);
    }

    public function destroy(Event $event) {
        if($event->user_id != Auth::id()) return response()->json(['error'=>'Unauthorized'],403);

        $event->delete();
        return response()->json(['message'=>'Event deleted']);
    }

    public function register(Event $event) {
        $user = Auth::user();
        if($event->users()->where('user_id',$user->id)->exists())
            return response()->json(['message'=>'Already registered'],400);

        $event->users()->attach($user->id);
        return response()->json(['message'=>'Registered successfully']);
    }
}
