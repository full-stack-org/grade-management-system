package com.student.teacher.zuul.api.auth.proxy;

import javax.validation.Valid;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.student.teacher.zuul.api.auth.request.AuthRequest;
import com.student.teacher.zuul.api.auth.response.AuthResponse;

@FeignClient(name = "student-teacher-registration-service")
public interface AuthProxy {
	@PostMapping("/reg/details/v1/findByEmailId")
	AuthResponse loadUserByEmailId(@Valid @RequestBody AuthRequest loadUserByEmailRequest);

}
