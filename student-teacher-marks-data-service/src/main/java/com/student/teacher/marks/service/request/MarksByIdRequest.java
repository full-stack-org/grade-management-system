package com.student.teacher.marks.service.request;

import javax.validation.constraints.Min;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MarksByIdRequest {
	
	@Min(value = 1)
	private Long studentId;
	
	@Min(value = 1)
	private int belongsTo;
	
}
