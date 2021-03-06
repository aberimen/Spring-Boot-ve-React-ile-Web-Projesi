package com.aberimen.sosyalmedya.user;

import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.aberimen.sosyalmedya.auth.Token;
import com.aberimen.sosyalmedya.post.Post;

import lombok.Data;

@Entity
@Data
public class User implements UserDetails {

	private static final long serialVersionUID = -7517467516212741199L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@NotNull(message = "{aberimen.validation.constraints.username.NotNull.message}")
	@Size(min = 4, max = 255)
	@UniqueUsername
	private String username;

	@NotNull
	@Size(max = 255)
	private String firstName;

	@NotNull
	private String lastName;

	@NotNull
	@Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$", message = "password must be at least 8 characters with uppercase letters")
	private String password;

	private String image;

	@OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
	private List<Post> posts;

	@OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
	private List<Token> tokens;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		return AuthorityUtils.createAuthorityList("Role_user");
	}

	@Override
	public boolean isAccountNonExpired() {

		return true;
	}

	@Override
	public boolean isAccountNonLocked() {

		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {

		return true;
	}

	@Override
	public boolean isEnabled() {

		return true;
	}

}
