package com.student.teacher.marks.service.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.student.teacher.marks.service.request.MarksByIdRequest;
import com.student.teacher.marks.service.request.MarksRequest;
import com.student.teacher.marks.service.response.MarksByIdResponse;
import com.student.teacher.marks.service.response.MarksResponse;
import com.student.teacher.marks.service.service.MarksService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/marks/v1")
@Slf4j
public class MarksController {

	@Autowired
	private MarksService marksService;

	/**
	 * 
	 * @param marksRequest
	 * @return
	 */
	@PostMapping("/updateMarks")
	public MarksResponse updateMarks(@Valid @RequestBody MarksRequest marksRequest) {
		log.info("Entered updateMarks in MarksController with student Id {} ", marksRequest.getStudentId());

		MarksResponse marksResponse = marksService.saveMarks(marksRequest);

		log.info("Exit updateMarks in MarksController with student Id {} ", marksResponse.getStudentId());

		return marksResponse;

	}
	
	/**
	 * 
	 * @param marksByIdRequest
	 * @return
	 */
	@PostMapping("/getMarksById")
	public MarksByIdResponse getMarksByStudentId(@Valid @RequestBody MarksByIdRequest marksByIdRequest) {
		log.info("Entered updateMarks in MarksController with student Id {} ", marksByIdRequest.getStudentId());
		
		MarksByIdResponse marksByIdResponse = marksService.getMarksByStudentId(marksByIdRequest);
		
		log.info("Exit updateMarks in MarksController with student Id {} ", marksByIdResponse.getStudentId());
		
		return marksByIdResponse;
	}

}
