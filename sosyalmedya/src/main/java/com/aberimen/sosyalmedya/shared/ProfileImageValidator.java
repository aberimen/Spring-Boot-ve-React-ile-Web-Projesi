package com.aberimen.sosyalmedya.shared;

import java.util.Arrays;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.aberimen.sosyalmedya.file.FileService;

public class ProfileImageValidator implements ConstraintValidator<ProfileImage, String>{

	@Autowired
	FileService fileService;
	
	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if(value == null || value.isEmpty()) { // Kullanıcının fotoğraf yüklemesi zorunlu değil
			return true;  // fotoğraf yüklememişse valid image olarak dönüş yapıyoruz.
		}
		
		List<String> supportedTypes = Arrays.asList("image/jpeg","image/png");
		
		String fileType = fileService.detectType(value);
		
		return supportedTypes.contains(fileType);
	}

}
