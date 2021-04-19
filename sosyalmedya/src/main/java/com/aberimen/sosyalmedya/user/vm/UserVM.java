package com.aberimen.sosyalmedya.user.vm;

import com.aberimen.sosyalmedya.user.User;
import lombok.Data;

@Data
public class UserVM {

	private String username;
	private String firstName;
	private String lastName;
	private String image;

	public UserVM(User user) {
		this.username = user.getUsername();
		this.firstName = user.getFirstName();
		this.lastName = user.getLastName();
		this.image = user.getImage();

	}

}
