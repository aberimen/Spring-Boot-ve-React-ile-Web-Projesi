package com.aberimen.sosyalmedya.post.vm;

import com.aberimen.sosyalmedya.post.Post;
import com.aberimen.sosyalmedya.user.vm.UserVM;

import lombok.Data;

@Data
public class PostVM {

	private long id;

	private String content;

	private long timestamp;

	private UserVM user;

	public PostVM(Post post) {
		this.setId(post.getId());
		this.setContent(post.getContent());
		this.setTimestamp(post.getTimestamp().getTime());
		this.setUser(new UserVM(post.getUser()));
	}

}
