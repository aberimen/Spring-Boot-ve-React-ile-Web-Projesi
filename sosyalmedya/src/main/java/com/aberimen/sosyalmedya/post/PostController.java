package com.aberimen.sosyalmedya.post;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aberimen.sosyalmedya.post.vm.PostVM;
import com.aberimen.sosyalmedya.shared.CurrentUser;
import com.aberimen.sosyalmedya.shared.GenericResponse;
import com.aberimen.sosyalmedya.user.User;

@RestController
public class PostController {

	@Autowired
	private PostService postService;

	@PostMapping("/api/posts")
	public ResponseEntity<?> saveUser(@Valid @RequestBody Post post, @CurrentUser User user) {
		postService.savePost(post, user);
		return ResponseEntity.ok(new GenericResponse("Post kaydedildi"));
	}

	@GetMapping("/api/posts")
	public Page<PostVM> getPosts(@PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable) {

		return postService.getPosts(pageable).map(PostVM::new);
	}

	@GetMapping("/api/users/{username}/posts")
	public Page<PostVM> getUserPosts(@PathVariable String username,
			@PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable) {

		return postService.getUserPosts(username, pageable).map(PostVM::new);
	}

	@GetMapping("/api/posts/{id:[0-9]+}")
	public ResponseEntity<?> getPostsRelative(
			@PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable, @PathVariable long id,
			@RequestParam(required = false, defaultValue = "false") boolean count) {

		if (count) {
			Map<String, Long> response = new HashMap<>();
			response.put("count", postService.getNewPostCount(id));
			return ResponseEntity.ok(response);
		}

		return ResponseEntity.ok(postService.getOldPosts(pageable, id).map(PostVM::new));
	}

	@GetMapping("/api/users/{username}/posts/{id:[0-9]+}")
	public ResponseEntity<?> getUserPostsRelative(@PathVariable String username, @PathVariable long id,
			@PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable,
			@RequestParam(required = false, defaultValue = "false") boolean count) {

		if (count) {
			Map<String, Long> response = new HashMap<>();
			response.put("count", postService.getNewPostCountOfUser(username, id));

			return ResponseEntity.ok(response);

		}

		return ResponseEntity.ok(postService.getUserOldPosts(username, id, pageable).map(PostVM::new));
	}
}
