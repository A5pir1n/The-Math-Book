<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}

/*

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function checkUsername($username)
    {
        // Check if the username exists in the database
        $exists = User::where('username', $username)->exists();

        // Return the result as a JSON response
        return response()->json(['exists' => $exists]);
    }
}


fetch('/username-exists/some_username')
    .then(response => response.json())
    .then(data => {
        if (data.exists) {
            console.log('Username already exists.');
        } else {
            console.log('Username is available.');
        }
    });





*?
