<?php

namespace App\Http\Responses;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        if ($request->wantsJson()) {
            return response()->json(['two_factor' => false]);
        }

        $defaultRedirect = $request->user()->isAdmin()
            ? '/admin/subscriptions'
            : '/dashboard';

        $intended = $request->session()->get('url.intended');
        $adminIntended = $intended
            ? Str::startsWith(parse_url($intended, PHP_URL_PATH) ?? '', '/admin')
            : false;

        if ($adminIntended && ! $request->user()->isAdmin()) {
            return Redirect::to('/dashboard');
        }

        return Redirect::intended($defaultRedirect);
    }
}
