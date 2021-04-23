package com.aberimen.sosyalmedya.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

import javax.validation.Validation;
import javax.validation.ValidationException;

import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aberimen.sosyalmedya.configuration.AppConfiguration;


@Service
public class FileService {

	@Autowired
	AppConfiguration appConfiguration;

	public String wiriteBase64StringToFile(String image) throws IOException {
		
		byte[] decodedString = Base64.getDecoder().decode(image);

		String fileName = getRandomFileName();
		File file = new File(appConfiguration.getUploadImagePath() + "/" + fileName);
		
		OutputStream outputStream = new FileOutputStream(file);
		outputStream.write(decodedString);
		outputStream.close();

		return fileName;
	}

	public String getRandomFileName() {
		return UUID.randomUUID().toString();

	}

	public void deleteFile(String oldImage) {
		if (oldImage == null) {
			return;
		}
		try {
			Files.deleteIfExists(Path.of(appConfiguration.getUploadImagePath(), oldImage));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public String detectType(String file) {
		Tika tika = new Tika(); // dosya formatı kontrolü için
		byte[] decodedString = Base64.getDecoder().decode(file);
		
		return tika.detect(decodedString);
	}
}