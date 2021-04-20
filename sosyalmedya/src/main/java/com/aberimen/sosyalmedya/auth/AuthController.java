package com.aberimen.sosyalmedya.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aberimen.sosyalmedya.security.MyUserDetails;
import com.aberimen.sosyalmedya.shared.CurrentUser;
import com.aberimen.sosyalmedya.user.User;
import com.aberimen.sosyalmedya.user.UserRepository;
import com.aberimen.sosyalmedya.user.vm.UserVM;

@RestController
public class AuthController {
	
	@Autowired
	UserRepository userRepositor;
	

	@PostMapping("/api/auth")
	UserVM auth(@CurrentUser MyUserDetails user) {
		
		String username = user.getUsername();
		User userInDB = userRepositor.findByUsername(username);
		
		return new UserVM(userInDB);


	}

}
