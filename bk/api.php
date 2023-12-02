use App\Http\Controllers\PageGeneratorController;

Route::post('/generate-page', [PageGeneratorController::class, 'generatePage']);
Route::get('/components', [PageGeneratorController::class, 'getComponents']);
Route::post('/save-page', [PageGeneratorController::class, 'savePage']);
