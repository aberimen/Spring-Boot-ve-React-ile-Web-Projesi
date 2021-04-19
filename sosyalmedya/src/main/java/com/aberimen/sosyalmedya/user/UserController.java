package com.aberimen.sosyalmedya.user;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.aberimen.sosyalmedya.shared.GenericResponse;
import com.aberimen.sosyalmedya.shared.View;
import com.fasterxml.jackson.annotation.JsonView;

@RestController
public class UserController {

	@Autowired
	UserService userService;

	@ResponseStatus(code = HttpStatus.CREATED)
	@PostMapping("/api/users")
	public GenericResponse createUser(@Valid @RequestBody User user) {
		userService.save(user);
		return new GenericResponse("user created");
	}

	@GetMapping("/api/users")
	@JsonView(View.Base.class)
	public Page<User> getUsers(Pageable pageable) {
		
		return userService.getUsers(pageable);
	}

}
