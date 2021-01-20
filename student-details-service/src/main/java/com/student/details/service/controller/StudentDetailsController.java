package com.student.details.service.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.student.details.service.proxy.StudentDetailsProxy;
import com.student.details.service.request.StudentDetailsRequest;
import com.student.details.service.response.StudentDetailsResponse;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/student/details/v1")
@Slf4j
public class StudentDetailsController {

	@Autowired
	private StudentDetailsProxy studentDetailsProxy;

	/**
	 * 
	 * @param studentDetailsRequest
	 * @return
	 */
	@PostMapping("/getStudentDetailsByClass")
	public StudentDetailsResponse getStudentDetailsByClass(
			@Valid @RequestBody StudentDetailsRequest studentDetailsRequest) {
		log.info("Entered getStudentDetailsByClass of StudentDetailsController");

		StudentDetailsResponse studentDetailsResponse = studentDetailsProxy
				.getStudentDetailsByClass(studentDetailsRequest);

		log.info("Exit getStudentDetailsByClass of StudentDetailsController");

		return studentDetailsResponse;
	}

}
