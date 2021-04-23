package com.aberimen.sosyalmedya.shared;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target({  FIELD })
@Retention(RUNTIME)
@Constraint(validatedBy = { FileTypeValidator.class })
public @interface FileType {
	
	String message() default "Unsupported File Type";

	Class<?>[] groups() default { };

	Class<? extends Payload>[] payload() default { };
	
	String [] types();
}
