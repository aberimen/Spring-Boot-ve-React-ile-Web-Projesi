package com.aberimen.sosyalmedya.user;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.aberimen.sosyalmedya.shared.CurrentUser;
import com.aberimen.sosyalmedya.shared.GenericResponse;
import com.aberimen.sosyalmedya.user.vm.UpdatedUserVM;
import com.aberimen.sosyalmedya.user.vm.UserVM;

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
	public Page<UserVM> getUsers(Pageable pageable, @CurrentUser User user) {

		return userService.getUsers(pageable, user).map(UserVM::new);
	}

	@GetMapping("api/users/{username}")
	public UserVM getByUsername(@PathVariable String username) {
		User user = userService.getByUsername(username);

		return new UserVM(user);
	}

	@PutMapping("/api/users/{username}")
	public UserVM updateFullName(@PathVariable String username, @RequestBody UpdatedUserVM updatedUser) {
		User user = userService.updateFullName(username, updatedUser);

		return new UserVM(user);
	}
}
