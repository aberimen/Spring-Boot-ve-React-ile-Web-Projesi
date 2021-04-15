package com.aberimen.sosyalmedya.api;

import java.util.Date;
import java.util.Map;

import com.aberimen.sosyalmedya.shared.View;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonView;

import lombok.Data;

@Data
@JsonView(View.Base.class)
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
