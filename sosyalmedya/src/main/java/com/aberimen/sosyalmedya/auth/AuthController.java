package com.aberimen.sosyalmedya.auth;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aberimen.sosyalmedya.shared.CurrentUser;
import com.aberimen.sosyalmedya.user.User;
import com.aberimen.sosyalmedya.user.vm.UserVM;

@RestController
public class AuthController {

	@PostMapping("/api/auth")
	UserVM auth(@CurrentUser User user) {

		return new UserVM(user);

	}

}
