package com.aberimen.sosyalmedya.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "sosyalmedya")
public class AppConfiguration {

	private String uploadPath;

	private String profileStorage = "profile";

	private String attachmentStorage = "attachments";

	public String getProfileUploadPath() {
		return uploadPath + "/" + profileStorage;
	}

	public String getAttachmentUploadPath() {
		return uploadPath + "/" + attachmentStorage;
	}

}
