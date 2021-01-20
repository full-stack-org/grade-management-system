package com.student.teacher.marks.service.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.student.teacher.marks.service.entity.MarksEntity;
import com.student.teacher.marks.service.repository.MarksRepository;
import com.student.teacher.marks.service.request.MarksByIdRequest;
import com.student.teacher.marks.service.request.MarksRequest;
import com.student.teacher.marks.service.response.MarksByIdResponse;
import com.student.teacher.marks.service.response.MarksResponse;
import com.student.teacher.marks.service.response.StatusResponse;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class MarksService {

	@Autowired
	private MarksRepository marksRepository;

	/**
	 * 
	 * @param marksRequest
	 * @return
	 */
	public MarksResponse saveMarks(MarksRequest marksRequest) {
		log.info("Entered saveMarks in MarksService with student id {} ", marksRequest.getStudentId());
		MarksResponse marksResponse = new MarksResponse();
		StatusResponse statusResponse = new StatusResponse();
		try {
			MarksEntity marksEntity = prepareServiceRequest(marksRequest);

			MarksEntity serviceResponse = marksRepository.save(marksEntity);

			marksResponse.setStudentId(serviceResponse.getStudentId().intValue());
			statusResponse.setStatusCode(200);
			statusResponse.setStatusMessage("Marks Updated Successfully");
			marksResponse.setStatusResponse(statusResponse);
		} catch (Exception e) {
			statusResponse.setStatusCode(422);
			statusResponse.setStatusMessage("Marks Updation Failed");
			marksResponse.setStatusResponse(statusResponse);
			log.error("Error while  saveMarks in MarksService {} ", e.getMessage());
		}

		return marksResponse;
	}

	/**
	 * 
	 * @param marksByIdRequest
	 * @return
	 */
	public MarksByIdResponse getMarksByStudentId(MarksByIdRequest marksByIdRequest) {
		MarksByIdResponse marksByIdResponse = new MarksByIdResponse();
		StatusResponse statusResponse = new StatusResponse();
		log.info("Entered getMarksByStudentId in MarksService with student id {} ", marksByIdRequest.getStudentId());

		try {
			Optional<MarksEntity> serviceResponse = marksRepository
					.findByStudentIdAndBelongsTo(marksByIdRequest.getStudentId(), marksByIdRequest.getBelongsTo());

			if (serviceResponse.isPresent()) {
				marksByIdResponse.setStudentId(serviceResponse.get().getStudentId());
				marksByIdResponse.setGrade(serviceResponse.get().getGrade());
				marksByIdResponse.setHindiMarks(serviceResponse.get().getHindiMarks());
				marksByIdResponse.setEnglishMarks(serviceResponse.get().getEnglishMarks());
				marksByIdResponse.setTeluguMarks(serviceResponse.get().getTeluguMarks());
				statusResponse.setStatusCode(200);
				statusResponse.setStatusMessage("Marks fetched Successfully");
				marksByIdResponse.setStatusResponse(statusResponse);
			}

		} catch (Exception e) {
			statusResponse.setStatusCode(422);
			statusResponse.setStatusMessage("Marks fetch Failed");
			marksByIdResponse.setStatusResponse(statusResponse);
			log.error("Error while  getMarksByStudentId in MarksService {} ", e.getMessage());
		}

		return marksByIdResponse;
	}

	/**
	 * 
	 * @param marksRequest
	 * @return
	 */
	private MarksEntity prepareServiceRequest(MarksRequest marksRequest) {
		MarksEntity marksEntity = new MarksEntity();
		marksEntity.setStudentId(marksRequest.getStudentId());
		marksEntity.setTeluguMarks(marksRequest.getTeluguMarks());
		marksEntity.setEnglishMarks(marksRequest.getEnglishMarks());
		marksEntity.setHindiMarks(marksRequest.getHindiMarks());
		marksEntity.setBelongsTo(marksRequest.getBelongsTo());

		int totalMarks = marksRequest.getTeluguMarks() + marksRequest.getEnglishMarks() + marksRequest.getHindiMarks();

		if (totalMarks > 280 && totalMarks < 300) {
			marksEntity.setGrade("A");
		} else if (totalMarks > 200 && totalMarks < 279) {
			marksEntity.setGrade("B");
		} else if (totalMarks > 120 && totalMarks < 199) {
			marksEntity.setGrade("C");
		} else {
			marksEntity.setGrade("D");
		}

		return marksEntity;
	}

}
