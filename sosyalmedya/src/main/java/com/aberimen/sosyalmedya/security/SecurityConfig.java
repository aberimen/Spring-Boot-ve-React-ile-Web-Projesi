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
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.aberimen.sosyalmedya.auth.TokenRequestFilter;


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

		http.exceptionHandling().authenticationEntryPoint(new AuthEntryPoint());
		
		
		http.headers().frameOptions().sameOrigin(); // h2-console erişmek için

		http
		.authorizeRequests()
			.antMatchers(HttpMethod.PUT, "/api/users/{username}").authenticated()
			.antMatchers(HttpMethod.POST, "/api/posts").authenticated() //sadece giriş yapmış kullanıcılar paylaşım yapabilsin
			.antMatchers(HttpMethod.POST,"/api/post-attachments").authenticated()
			.antMatchers(HttpMethod.POST,"/api/logout").authenticated()
			.and()
				.authorizeRequests().anyRequest().permitAll();
		
		http.addFilterBefore(tokenRequestFilter(), UsernamePasswordAuthenticationFilter.class);
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	TokenRequestFilter tokenRequestFilter() {
		return new TokenRequestFilter();
	}

}
