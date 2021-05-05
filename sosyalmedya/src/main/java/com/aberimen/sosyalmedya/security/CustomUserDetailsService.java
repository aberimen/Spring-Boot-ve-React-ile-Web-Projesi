package com.aberimen.sosyalmedya.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.aberimen.sosyalmedya.user.User;
import com.aberimen.sosyalmedya.user.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	
		Optional<User> user = Optional.ofNullable(userRepository.findByUsername(username));

		user.orElseThrow(() -> new UsernameNotFoundException("Kullanıcı Bulunamadı"));

		return user.get();
	}

}
