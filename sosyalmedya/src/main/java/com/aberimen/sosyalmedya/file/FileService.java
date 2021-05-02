package com.aberimen.sosyalmedya.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.aberimen.sosyalmedya.configuration.AppConfiguration;

@Service
@EnableScheduling
public class FileService {

	@Autowired
	AppConfiguration appConfiguration;

	@Autowired
	FileAttachmentRepository fileAttachmentRepository;

	public String wiriteBase64StringToFile(String image) throws IOException {

		byte[] decodedString = Base64.getDecoder().decode(image);

		String fileName = getRandomFileName();
		File file = new File(appConfiguration.getProfileUploadPath()+ "/" + fileName);

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
			Files.deleteIfExists(Path.of(appConfiguration.getUploadPath(), oldImage));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void deleteAttachment(String file) {
		deleteFile(appConfiguration.getAttachmentUploadPath() + "/" + file);
	}

	public void deleteProfileImage(String file) {
		deleteFile(appConfiguration.getProfileUploadPath() + "/" + file);
	}

	public String detectType(String file) {
		Tika tika = new Tika(); // dosya formatı kontrolü için
		byte[] decodedString = Base64.getDecoder().decode(file);

		return tika.detect(decodedString);
	}

	public String detectType(byte[] bytes) {
		Tika tika = new Tika(); // dosya formatı kontrolü için

		return tika.detect(bytes);
	}

	public FileAttachment savePostAttachment(MultipartFile multipartFile) {

		String fileName = getRandomFileName();
		String fileType = null;
		File file = new File(appConfiguration.getAttachmentUploadPath()+ "/" + fileName);

		try {
			OutputStream outputStream = new FileOutputStream(file);
			outputStream.write(multipartFile.getBytes());
			outputStream.close();
			fileType = detectType(multipartFile.getBytes());
		} catch (IOException e) {

			e.printStackTrace();
		}

		FileAttachment fileAttachment = new FileAttachment();
		fileAttachment.setName(fileName);
		fileAttachment.setDate(new Date());
		fileAttachment.setFileType(fileType);

		return fileAttachmentRepository.save(fileAttachment);

	}

	@Scheduled(fixedRate = 24 * 60 * 60 * 1000) // ne kadar sıklıkla çağırılsın , milisaniye cinsinden
	public void cleanupStorage() {
		Date twentyFourHourAgo = new Date(System.currentTimeMillis() - (24 * 60 * 60 * 1000)); // 1 gün önce

		List<FileAttachment> eligibleToDelete = fileAttachmentRepository
				.findByDateBeforeAndPostIsNull(twentyFourHourAgo); // son 1 günden önceki silinecek dosyaların
																	// getirlmesi

		for (FileAttachment fileAttachment : eligibleToDelete) {
			deleteAttachment(fileAttachment.getName());
			fileAttachmentRepository.deleteById(fileAttachment.getId());

		}

	}
}
