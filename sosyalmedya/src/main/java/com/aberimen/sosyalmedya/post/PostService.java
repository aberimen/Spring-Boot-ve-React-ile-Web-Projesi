package com.aberimen.sosyalmedya.post;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.aberimen.sosyalmedya.user.User;
import com.aberimen.sosyalmedya.user.UserService;

@Service
public class PostService {

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private UserService userService;

	public void savePost(Post post, User user) {
		post.setTimestamp(new Date());
		post.setUser(user);
		postRepository.save(post);
	}

	public Page<Post> getPosts(Pageable pageable) {

		return postRepository.findAll(pageable);
	}

	public Page<Post> getUserPosts(String username, Pageable pageable) {
		User userInDB = userService.getByUsername(username);
		
		return postRepository.findByUser(userInDB, pageable);
	}

	public Page<Post> getOldPosts(Pageable pageable, long id) {
		
		return postRepository.findByIdLessThan(id, pageable);
	}

	public Page<Post> getUserOldPosts(String username, long id, Pageable pageable) {
		User userInDB = userService.getByUsername(username);
		
		return postRepository.findByIdLessThanAndUser(id, userInDB, pageable);
	}

}
