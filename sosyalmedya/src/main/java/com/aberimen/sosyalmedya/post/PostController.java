package com.aberimen.sosyalmedya.post;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

import com.aberimen.sosyalmedya.post.vm.PostSubmitVM;
import com.aberimen.sosyalmedya.post.vm.PostVM;
import com.aberimen.sosyalmedya.shared.CurrentUser;
import com.aberimen.sosyalmedya.shared.GenericResponse;
import com.aberimen.sosyalmedya.user.User;

@RestController
public class PostController {

	@Autowired
	private PostService postService;

	@PostMapping("/api/posts")
	public ResponseEntity<?> savePost(@Valid @RequestBody PostSubmitVM post, @CurrentUser User user) {
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

	@GetMapping({ "/api/posts/{id:[0-9]+}", "/api/users/{username}/posts/{id:[0-9]+}" })
	public ResponseEntity<?> getPostsRelative(
			@PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable, @PathVariable long id,
			@PathVariable(required = false) String username,
			@RequestParam(required = false, defaultValue = "false") boolean count,
			@RequestParam(required = false, defaultValue = "before") String direction) {

		if (count) {
			Map<String, Long> response = new HashMap<>();
			response.put("count", postService.getNewPostCount(username, id));
			return ResponseEntity.ok(response);
		}

		if (direction.equals("after")) {
			List<PostVM> newPosts = postService.getNewPosts(username, id, pageable.getSort()).stream().map(PostVM::new)
					.collect(Collectors.toList());

			return ResponseEntity.ok(newPosts);
		}

		return ResponseEntity.ok(postService.getOldPosts(username, pageable, id).map(PostVM::new));
	}


}
