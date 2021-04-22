package com.aberimen.sosyalmedya.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Base64;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aberimen.sosyalmedya.configuration.AppConfiguration;

@Service
public class FileService {

	@Autowired
	AppConfiguration appConfiguration;

	public String wiriteBase64StringToFile(String image) throws IOException {

		String fileName = getRandomFileName();
		File file = new File(appConfiguration.getUploadImagePath() + "/" + fileName);

		OutputStream outputStream = new FileOutputStream(file);
		byte[] decodedString = Base64.getDecoder().decode(image);
		outputStream.write(decodedString);
		outputStream.close();

		return fileName;
	}

	public String getRandomFileName() {
		return UUID.randomUUID().toString();

	}
}
