package com.aberimen.sosyalmedya.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
	
	@Autowired
	AuthService authService;

	@PostMapping("/api/auth")
	AuthenticationResponse auth(@RequestBody AuthenticationRequest authenticationRequest) {

		return authService.authenticated(authenticationRequest);

	}

}
