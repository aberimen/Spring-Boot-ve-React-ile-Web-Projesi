package com.aberimen.sosyalmedya.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.error.ErrorAttributeOptions.Include;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

@RestController
public class ErrorHandler implements ErrorController {

	@Autowired
	private ErrorAttributes errorAttributes;

	@RequestMapping("/error")
	ApiErrorResponse handleError(WebRequest webRequest) {
		Map<String, Object> attributes = this.errorAttributes.getErrorAttributes(webRequest,
				ErrorAttributeOptions.of(Include.MESSAGE, Include.BINDING_ERRORS));
		
		int status = (int) attributes.get("status");
		String message = (String) attributes.get("message");
		String path = (String) attributes.get("path");

		ApiErrorResponse errorBody = new ApiErrorResponse(status, message, path);

		if (attributes.containsKey("errors")) {
			List<FieldError> errors = (List<FieldError>) attributes.get("errors");
			Map<String, String> validationErr = new HashMap<>();

			for (FieldError error : errors) {
				validationErr.put(error.getField(), error.getDefaultMessage());
			}
			errorBody.setValidationError(validationErr);
		}
		
		

		return errorBody;
	}

	@Override
	public String getErrorPath() {

		return "/error";
	}

}
