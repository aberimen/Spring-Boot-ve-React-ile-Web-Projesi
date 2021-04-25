package com.aberimen.sosyalmedya.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	CustomUserDetailsService useDetailsService;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(useDetailsService).passwordEncoder(passwordEncoder());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();

		http.httpBasic().authenticationEntryPoint(new AuthEntryPoint());
		
		http.headers().frameOptions().sameOrigin(); // h2-console erişmek için

		http
		.authorizeRequests()
			.antMatchers(HttpMethod.POST, "/api/auth").authenticated()
			.antMatchers(HttpMethod.PUT, "/api/users/{username}").authenticated()
			.antMatchers(HttpMethod.POST, "/api/posts").authenticated() //sadece giriş yapmış kullanıcılar paylaşım yapabilsin
			.and()
				.authorizeRequests().anyRequest().permitAll();
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
