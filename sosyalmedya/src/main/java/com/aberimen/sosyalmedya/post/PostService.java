package com.aberimen.sosyalmedya.post;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {

	@Autowired
	private PostRepository postRepository;

	public void savePost(Post post) {
		post.setTimestamp(new Date());
		postRepository.save(post);
	}

}
