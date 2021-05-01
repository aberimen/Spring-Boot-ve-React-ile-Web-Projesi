package com.aberimen.sosyalmedya.file;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FileAttachmentRepository extends JpaRepository<FileAttachment, Long> {
	
	List<FileAttachment> findByDateBeforeAndPostIsNull(Date date); // verilen tarihten önceki ve Post değeri null olan dosyaları döner
}
