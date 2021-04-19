package com.aberimen.sosyalmedya.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aberimen.sosyalmedya.security.MyUserDetails;
import com.aberimen.sosyalmedya.user.User;
import com.aberimen.sosyalmedya.user.UserRepository;

@RestController
public class AuthController {
	
	@Autowired
	UserRepository userRepositor;
	
	 
	BCryptPasswordEncoder bEncoder = new BCryptPasswordEncoder();

	@PostMapping("/api/auth")
	public ResponseEntity<?> auth() {
		
		MyUserDetails userDetails= (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String username = userDetails.getUsername();
		User userInDB = userRepositor.findByUsername(username);
		
		return ResponseEntity.ok(userInDB);


	}

}
