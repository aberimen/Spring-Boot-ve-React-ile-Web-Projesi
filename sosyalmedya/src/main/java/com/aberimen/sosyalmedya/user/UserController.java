package com.aberimen.sosyalmedya.user;



import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.aberimen.sosyalmedya.shared.GenericResponse;



@RestController
public class UserController {

	@Autowired
	UserService userService;

	@ResponseStatus(code = HttpStatus.CREATED)
	@PostMapping("/api//users")
	public GenericResponse createUser( @Valid @RequestBody User user) {
		userService.save(user);
		return new GenericResponse("user created");
	}
	

	
	

}
