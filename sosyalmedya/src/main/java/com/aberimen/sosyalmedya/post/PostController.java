package com.aberimen.sosyalmedya.post;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
}
