package com.student.teacher.zuul.api.auth.request;

import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {
	
	@NotEmpty(message = "Email Id is Mandatory.")
	private String emailId;
}
