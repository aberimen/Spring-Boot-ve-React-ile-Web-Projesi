package com.aberimen.sosyalmedya.post;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.aberimen.sosyalmedya.file.FileAttachment;
import com.aberimen.sosyalmedya.file.FileAttachmentRepository;
import com.aberimen.sosyalmedya.post.vm.PostSubmitVM;
import com.aberimen.sosyalmedya.user.User;
import com.aberimen.sosyalmedya.user.UserService;

@Service
public class PostService {

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private FileAttachmentRepository attachmentRepository;

	public void savePost(PostSubmitVM postSubmitVM, User user) {
		Post post = new Post();
		post.setContent(postSubmitVM.getContent());
		post.setTimestamp(new Date());
		post.setUser(user);
		postRepository.save(post);
		
		Optional<FileAttachment> optionalFileAttachment = attachmentRepository.findById(postSubmitVM.getAttachmentId());
		if (optionalFileAttachment.isPresent()) {
			FileAttachment fileAttachment = optionalFileAttachment.get();
			fileAttachment.setPost(post);
			attachmentRepository.save(fileAttachment);
		}

	}

	public Page<Post> getPosts(Pageable pageable) {

		return postRepository.findAll(pageable);
	}

	public Page<Post> getUserPosts(String username, Pageable pageable) {
		User userInDB = userService.getByUsername(username);

		return postRepository.findByUser(userInDB, pageable);
	}

	public Page<Post> getOldPosts(String username, Pageable pageable, long id) {
		Specification<Post> specification = idLessThan(id);
		if (username != null) {
			User inDb = userService.getByUsername(username);
			specification = specification.and(isUser(inDb));
		}
		return postRepository.findAll(specification, pageable);

	}

	public long getNewPostCount(String username, long id) {
		Specification<Post> specification = idGreaterThan(id);
		if (username != null) {
			User inDb = userService.getByUsername(username);
			specification = specification.and(isUser(inDb));
		}
		return postRepository.count(specification);
	}

	public List<Post> getNewPosts(String username, long id, Sort sort) {

		Specification<Post> specification = idGreaterThan(id);
		if (username != null) {
			User inDb = userService.getByUsername(username);
			specification = specification.and(isUser(inDb));
		}
		return postRepository.findAll(specification, sort);

	}

	Specification<Post> idGreaterThan(long id) {
		return (root, query, criteriaBuilder) -> criteriaBuilder.greaterThan(root.get("id"), id);

	}

	Specification<Post> idLessThan(long id) {
		return (root, query, criteriaBuilder) -> criteriaBuilder.lessThan(root.get("id"), id);

	}

	Specification<Post> isUser(User user) {
		return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("user"), user);

	}

}
