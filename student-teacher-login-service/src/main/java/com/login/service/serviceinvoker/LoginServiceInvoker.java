package com.login.service.serviceinvoker;

import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.login.service.request.LoginRequest;
import com.login.service.response.AuthenticationResponse;

@FeignClient(name = "student-teacher-zuul-api-gate-way")
@RibbonClient(name = "student-teacher-registration-service")
public interface LoginServiceInvoker {

	@PostMapping("/student-teacher-registration-service/reg/login/v1/authenticate")
	public AuthenticationResponse authenticate(@RequestBody LoginRequest loginDTO);

}
