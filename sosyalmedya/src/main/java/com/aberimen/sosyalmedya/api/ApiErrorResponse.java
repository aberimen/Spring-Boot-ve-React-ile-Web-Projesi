package com.aberimen.sosyalmedya.api;

import java.util.Date;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiErrorResponse {
	
	public ApiErrorResponse(int status, String message, String path) {
		this.status = status;
		this.message = message;
		this.path = path;
	}

	private String path;
	
	private String message;
	
	private int status;
	
	private long timestamp = new Date().getTime();
	
	private Map<String, String> validationError;
	

}
