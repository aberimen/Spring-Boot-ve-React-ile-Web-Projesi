package com.aberimen.sosyalmedya.post;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.aberimen.sosyalmedya.shared.GenericResponse;

@RestController
public class PostController {

	@Autowired
	private PostService postService;

	@PostMapping("/api/posts")
	public ResponseEntity<?> saveUser(@Valid @RequestBody Post post) {
		postService.savePost(post);
		return ResponseEntity.ok(new GenericResponse("Post kaydedildi"));
	}
	
	@GetMapping("/api/posts")
	public Page<Post> getPosts(@PageableDefault(sort = "id",direction = Direction.DESC ) Pageable pageable){
		
		return postService.getPosts(pageable);
	}
}
