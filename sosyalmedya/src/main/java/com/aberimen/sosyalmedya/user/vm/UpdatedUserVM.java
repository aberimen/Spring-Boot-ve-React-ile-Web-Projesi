package com.aberimen.sosyalmedya.user.vm;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class UpdatedUserVM {

	@NotNull
	@Size(min = 3, max = 255)
	private String firstName;

	@NotNull
	@Size(min = 3, max = 255)
	private String lastName;

	private String image;

}
