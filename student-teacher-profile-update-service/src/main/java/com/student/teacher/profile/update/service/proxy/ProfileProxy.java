package com.student.teacher.profile.update.service.proxy;

import javax.validation.Valid;

import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.student.teacher.profile.update.service.request.ProfileRequest;
import com.student.teacher.profile.update.service.request.UpdateProfileRequest;
import com.student.teacher.profile.update.service.response.ProfileResponse;
import com.student.teacher.profile.update.service.response.UpdateProfileResponse;

@FeignClient(name = "student-teacher-zuul-api-gate-way")
@RibbonClient(name = "student-teacher-registration-service")
public interface ProfileProxy {

	@PostMapping("/student-teacher-registration-service/reg/profile/v1/updateProfile")
	public UpdateProfileResponse updateProfile(@Valid @RequestBody UpdateProfileRequest profileRequest);

	@PostMapping("/student-teacher-registration-service/reg/profile/v1/getProfileById")
	public ProfileResponse getProfileById(@Valid @RequestBody ProfileRequest profileRequest);
}
