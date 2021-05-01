package com.aberimen.sosyalmedya.file;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileController {

	@Autowired
	FileService fileService;

	@PostMapping("/api/post-attachments")
	public FileAttachment savePostAttachment(MultipartFile file) { // "file" client tarafından gelecek form body içinde  yer alıyor
																	

		return fileService.savePostAttachment(file);

	}

}
