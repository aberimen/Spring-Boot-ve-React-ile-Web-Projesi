package com.aberimen.sosyalmedya.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.aberimen.sosyalmedya.api.NotFoundException;

@Service
public class UserService {

	UserRepository userRepository;

	PasswordEncoder passwordEncoder;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
		this.passwordEncoder = new BCryptPasswordEncoder();
	}

	public void save(User user) {
		String encryptedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(encryptedPassword);
		userRepository.save(user);
	}

	public Page<User> getUsers(Pageable pageable, User user) {
		// PageRequest pageble =PageRequest.of(page, limit);
		System.out.println(user);
		if (user != null) {
			return userRepository.findByUsernameNot(user.getUsername(), pageable);
		}
		return userRepository.findAll(pageable);
	}

	public User getByUsername(String username) {
		User user = userRepository.findByUsername(username);
		if(user == null) {
			throw new NotFoundException();
		}
		
		return user;
	}

}
