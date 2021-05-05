package com.aberimen.sosyalmedya.auth;

import java.util.Optional;
import java.util.UUID;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aberimen.sosyalmedya.user.User;
import com.aberimen.sosyalmedya.user.UserRepository;
import com.aberimen.sosyalmedya.user.vm.UserVM;

@Service
public class AuthService {

	UserRepository userRepository;
	PasswordEncoder passwordEncoder;
	TokenRepository tokenRepository;

	public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
			TokenRepository tokenRepository) {
		super();
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.tokenRepository = tokenRepository;
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

		Token token = new Token();
		token.setToken(generateToken());
		token.setUser(inDb);
		tokenRepository.save(token);

		return new AuthenticationResponse(token.getToken(), new UserVM(inDb));

	}

	public String generateToken() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	@Transactional
	public UserDetails getUserDetails(String token) {

		Optional<Token> tokenInDB = tokenRepository.findById(token);
		if (!tokenInDB.isPresent()) {

			return null;
		}

		return tokenInDB.get().getUser();
	}

	public void clearToken(String token) {
		tokenRepository.deleteById(token);
		
	}

}
