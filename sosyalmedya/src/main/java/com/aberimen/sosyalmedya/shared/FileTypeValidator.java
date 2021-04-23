package com.aberimen.sosyalmedya.shared;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.aberimen.sosyalmedya.file.FileService;

public class FileTypeValidator implements ConstraintValidator<FileType, String>{

	@Autowired
	FileService fileService;
	
	String fileTypes[];
	
	@Override
	public void initialize(FileType constraintAnnotation) {
		this.fileTypes = constraintAnnotation.types(); //anotasyondan gelen değerler
	}
	
	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if(value == null || value.isEmpty()) { // Kullanıcının dosya yüklemesi zorunlu değil
			return true;  // dosya yüklememişse valid  olarak dönüş yapıyoruz.
		}
		
		String fileType = fileService.detectType(value);
		
		for(String supportedType : fileTypes) {
			System.out.println(fileType.contains(supportedType));
			if(fileType.contains(supportedType)) {
				return true;
			}
		}
		
		return false;
	}

}
