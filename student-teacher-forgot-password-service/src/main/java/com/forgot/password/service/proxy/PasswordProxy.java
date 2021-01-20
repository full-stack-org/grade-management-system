package com.forgot.password.service.proxy;

import javax.validation.Valid;

import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.forgot.password.service.request.FindByEmailRequest;
import com.forgot.password.service.request.PasswordUpdateRequest;
import com.forgot.password.service.response.GetByEmailIdResponse;
import com.forgot.password.service.response.PasswordUpdateResponse;

@FeignClient(name = "student-teacher-zuul-api-gate-way")
@RibbonClient(name = "student-teacher-registration-service")
public interface PasswordProxy {

	@RequestMapping("/student-teacher-registration-service/reg/password/v1/updatePassword")
	public PasswordUpdateResponse updatePassword(@Valid @RequestBody PasswordUpdateRequest passwordUpdateRequest);

	@RequestMapping("/student-teacher-registration-service/reg/details/v1/findByEmailId")
	public GetByEmailIdResponse findByEmailId(@Valid FindByEmailRequest emailRequest);
}
