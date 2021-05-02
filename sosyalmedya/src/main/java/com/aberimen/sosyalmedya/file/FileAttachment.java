package com.aberimen.sosyalmedya.file;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.aberimen.sosyalmedya.post.Post;

import lombok.Data;

@Data
@Entity
public class FileAttachment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String name;

	@Temporal(TemporalType.TIMESTAMP)
	private Date date;
	
	private String fileType;

	@OneToOne
	private Post post;

}
