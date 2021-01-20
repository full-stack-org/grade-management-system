package com.student.details.service.proxy;

import javax.validation.Valid;

import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.student.details.service.request.StudentDetailsRequest;
import com.student.details.service.response.StudentDetailsResponse;

@FeignClient(name = "student-teacher-zuul-api-gate-way")
@RibbonClient(name = "student-teacher-registration-service")
public interface StudentDetailsProxy {

	@PostMapping("/student-teacher-registration-service/reg/student/v1/getStudentDetailsByClass")
	public StudentDetailsResponse getStudentDetailsByClass(@Valid @RequestBody StudentDetailsRequest studentDetailsRequest);

}
