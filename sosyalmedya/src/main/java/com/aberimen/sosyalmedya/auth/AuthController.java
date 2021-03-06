package com.aberimen.sosyalmedya.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.aberimen.sosyalmedya.shared.GenericResponse;

@RestController
public class AuthController {

	@Autowired
	AuthService authService;

	@PostMapping("/api/auth")
	AuthenticationResponse auth(@RequestBody AuthenticationRequest authenticationRequest) {

		return authService.authenticated(authenticationRequest);

	}

	@PostMapping("/api/logout")
	GenericResponse logoutHandler(@RequestHeader(name = "Authorization") String authorization) {
		final String token = authorization.substring(7);
		authService.clearToken(token);
		return new GenericResponse("logout success");

	}

}
