package com.aberimen.sosyalmedya.configuration;

import java.io.File;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

	@Autowired
	AppConfiguration appConfiguration;

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {

		registry.addResourceHandler("/images/**") // bu adrese yapılacak istekler
				.addResourceLocations("file:./" + appConfiguration.getUploadImagePath() + "/") // klasör yolu
				.setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS)); // browser tarafından cache'lenmesi.

	}


	@Bean
	public CommandLineRunner createDirectory() {

		return (args) -> {
			File folder = new File(appConfiguration.getUploadImagePath());
			boolean folderExists = folder.exists() && folder.isDirectory();

			if (!folderExists) {
				folder.mkdir();
			}
		};

	}
}
