package com.student.teacher.profile.update.service.request;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProfileRequest {
	@Min(value = 1)
	private Long id;

	@NotEmpty(message = "Email Id is mandatory")
	private String emailId;

	@NotEmpty(message = "First Name is mandatory")
	private String firstName;

	@NotEmpty(message = "Last Name is mandatory")
	private String lastName;

	@NotEmpty(message = "Gender is mandatory")
	private String gender;

	@NotEmpty(message = "Role is mandatory")
	private String role;

	@Min(value = 7)
	private int belongsTo;
}
