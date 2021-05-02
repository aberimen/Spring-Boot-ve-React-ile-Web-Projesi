package com.aberimen.sosyalmedya.file.vm;

import java.util.Date;

import com.aberimen.sosyalmedya.file.FileAttachment;

import lombok.Data;

@Data
public class FileAttachmentVM {


	private String name;

	private Date date;
	
	private String fileType;

	public FileAttachmentVM(FileAttachment fileAttachment) {
		this.setName(fileAttachment.getName());
		this.setDate(fileAttachment.getDate());
		this.setFileType(fileAttachment.getFileType());
	}
}
