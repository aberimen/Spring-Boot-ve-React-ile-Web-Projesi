package com.aberimen.sosyalmedya.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Base64;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class FileService {

	public String wiriteBase64StringToFile(String image) throws IOException {

		String fileName = getRandomFileName();
		File file = new File("stored-pictures/" + fileName);

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
