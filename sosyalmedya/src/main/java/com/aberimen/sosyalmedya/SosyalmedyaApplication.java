package com.aberimen.sosyalmedya;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.aberimen.sosyalmedya.user.User;
import com.aberimen.sosyalmedya.user.UserService;

@SpringBootApplication
public class SosyalmedyaApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(SosyalmedyaApplication.class, args);
		
	}
	
	@Bean
	CommandLineRunner initUser(UserService userService){
		return (args) ->{
			User user = new User();
			user.setUsername("aberimen");
			user.setFirstName("Abdurrahman");
			user.setLastName("Berimen");
			user.setImage("image");
			user.setPassword("1234");
			
			userService.save(user);
		};
		
	}
	
	
	
	

}
