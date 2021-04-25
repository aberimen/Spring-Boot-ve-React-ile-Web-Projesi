package com.aberimen.sosyalmedya.post;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.aberimen.sosyalmedya.user.User;

@Service
public class PostService {

	@Autowired
	private PostRepository postRepository;

	public void savePost(Post post, User user) {
		post.setTimestamp(new Date());
		post.setUser(user);
		postRepository.save(post);
	}

	public Page<Post> getPosts(Pageable pageable) {

		return postRepository.findAll(pageable);
	}

}
