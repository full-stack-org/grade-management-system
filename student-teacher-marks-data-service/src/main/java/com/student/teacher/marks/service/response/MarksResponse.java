package com.student.teacher.marks.service.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MarksResponse {
	private int studentId;
	private StatusResponse statusResponse;
}
