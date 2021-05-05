package com.aberimen.sosyalmedya.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.aberimen.sosyalmedya.user.User;
import com.aberimen.sosyalmedya.user.UserRepository;
import com.aberimen.sosyalmedya.user.vm.UserVM;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class AuthService {

	UserRepository userRepository;
	PasswordEncoder passwordEncoder;

	public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		super();
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public AuthenticationResponse authenticated(AuthenticationRequest authenticationRequest) {
		User inDb = userRepository.findByUsername(authenticationRequest.getUsername());
		if (inDb == null) {
			throw new UnauthorizedException();
		}

		boolean maches = passwordEncoder.matches(authenticationRequest.getPassword(), inDb.getPassword());

		if (!maches) {
			throw new UnauthorizedException();
		}
		String token = Jwts.builder().setSubject(inDb.getUsername()).signWith(SignatureAlgorithm.HS512, "secret_key")
				.compact();

		return new AuthenticationResponse(token, new UserVM(inDb));

	}

	public UserDetails getUserDetails(String jwt) {
		
		JwtParser parser = Jwts.parser().setSigningKey("secret_key");
		
		try {
			Claims claims = parser.parseClaimsJws(jwt).getBody();
			String username = claims.getSubject();
			User user = userRepository.findByUsername(username);
			return user;
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}

}
