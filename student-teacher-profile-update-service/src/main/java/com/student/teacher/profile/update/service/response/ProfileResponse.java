package com.student.teacher.profile.update.service.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileResponse {

	private int id;

	private String emailId;

	private String firstName;

	private String lastName;

	private String role;

	private String gender;

	private int belongsTo;
	
	private StatusResponse statusResponse;
}
