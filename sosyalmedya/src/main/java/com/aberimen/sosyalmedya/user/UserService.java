package com.aberimen.sosyalmedya.user;

import java.io.IOException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.aberimen.sosyalmedya.api.NotFoundException;
import com.aberimen.sosyalmedya.file.FileService;
import com.aberimen.sosyalmedya.user.vm.UpdatedUserVM;

@Service
public class UserService {

	UserRepository userRepository;

	PasswordEncoder passwordEncoder;

	FileService fileService;

	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, FileService fileService) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.fileService = fileService;
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
		if (user == null) {
			throw new NotFoundException();
		}

		return user;
	}

	public User updateFullName(String username, UpdatedUserVM user) {
		User userInDB = getByUsername(username);
		userInDB.setFirstName(user.getFirstName());
		userInDB.setLastName(user.getLastName());
		

		if (user.getImage() != null) {
			String oldImage = userInDB.getImage();
			try {
				String imageFile = fileService.wiriteBase64StringToFile(user.getImage());
				userInDB.setImage(imageFile);
				fileService.deleteFile(oldImage);
				
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		return userRepository.save(userInDB);
	}

}
