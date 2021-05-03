package com.aberimen.sosyalmedya.post;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aberimen.sosyalmedya.user.User;

@Service(value = "postSecurity") // bean ismi postSecurity
public class PostSecurityService {

	@Autowired
	PostRepository postRepository;
	
	public boolean isAuthorizedToDelete(long id, User user) {
		Optional<Post> post = postRepository.findById(id);
		if(!post.isPresent()) {
			return false;
		}
		
		if(post.get().getUser().getId() != user.getId()) {
			return false;
		}
		
		return true;
	}

}
