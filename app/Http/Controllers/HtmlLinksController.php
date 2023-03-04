<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HtmlLinksController extends Controller{

    public function index(){
        $links = [
            '/path/to/file1.html',
            '/path/to/file2.html',
            '/path/to/file3.html',
        ];

        return response()->json(['links' => $links]);
    }
}


/* TO USE IT:
fetch('/html-links')
    .then(response => response.json())
    .then(data => {
        // Do something with the links
        console.log(data.links);
    });
*/
