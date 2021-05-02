package com.aberimen.sosyalmedya.post.vm;

import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class PostSubmitVM {
	
	@Size(min = 5, max = 1000)
	private String content;
	
	private long attachmentId;

}
