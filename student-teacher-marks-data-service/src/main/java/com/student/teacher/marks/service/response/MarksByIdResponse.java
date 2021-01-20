package com.student.teacher.marks.service.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MarksByIdResponse {
	private Long studentId;
	private int teluguMarks;
	private int englishMarks;
	private int hindiMarks;
	private String grade;
	private StatusResponse statusResponse;
	
}
