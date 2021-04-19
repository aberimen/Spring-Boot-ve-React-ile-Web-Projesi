package com.aberimen.sosyalmedya.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;


import lombok.Data;

@Entity
@Data
public class User {
	@Id
	@GeneratedValue
	private long id;
	
	@NotNull(message = "{aberimen.validation.constraints.username.NotNull.message}")
	@Size(min = 4,max = 255)
	@UniqueUsername
	private String username;
	
	@NotNull
	@Size(max = 255)
	private String firstName;
	
	
	@NotNull
	private String lastName;
	
	@NotNull
	@Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$",message = "password must be at least 8 characters with uppercase letters")
	private String password;
	
	
	private String image;

}
