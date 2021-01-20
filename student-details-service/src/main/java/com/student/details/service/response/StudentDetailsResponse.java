package com.student.details.service.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.student.details.service.bean.StudentDetailsBean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(Include.NON_NULL)
public class StudentDetailsResponse {
	
	private List<StudentDetailsBean> studentDetailsBeansList;
	private StatusResponse statusResponse;

}
