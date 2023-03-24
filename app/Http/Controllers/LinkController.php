<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LinkController extends Controller
{
    public function index(){
        $links = Link::getAllLinks();
        return response()->json(['links' => $links]);
    }

    public function search(Request $request){
        $query = $request->input('q');

        $links = Link::where('title', 'like', "%$query%")
            ->orWhere('url', 'like', "%$query%")
            ->get();

        return response()->json(['links' => $links]);
    }

}

/*TO USE IT:
fetch('/links')
    .then(response => response.json())
    .then(data => {
        // Do something with the links
        console.log(data.links);
    });
*/