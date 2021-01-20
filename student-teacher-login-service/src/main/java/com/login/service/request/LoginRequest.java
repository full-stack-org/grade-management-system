package com.login.service.request;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
	
	@NotEmpty(message = "Email Id is Mandatory")
	private String emailId;
	
	@NotEmpty(message = "Password is Mandatory")
	private String password;
	
	@NotEmpty(message = "Role is Mandatory")
	private String role;
	
	@Min(value = 7)
	private int belongsTo;
}
