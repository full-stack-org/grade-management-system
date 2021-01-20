package com.forgot.password.service.request;

import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PasswordUpdateRequest {
	@NotEmpty(message = "Email Id is Mandatory")
	private String emailId;

	@NotEmpty(message = "Password is Mandatory")
	private String password;
}
