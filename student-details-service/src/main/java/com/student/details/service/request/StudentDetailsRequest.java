package com.student.details.service.request;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentDetailsRequest {
	@Min(value = 7)
	private int belongsTo;
	
	@NotEmpty(message = "Role is Mandatory")
	private String role;
}
