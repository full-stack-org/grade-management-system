package com.student.teacher.profile.update.service.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.student.teacher.profile.update.service.proxy.ProfileProxy;
import com.student.teacher.profile.update.service.request.ProfileRequest;
import com.student.teacher.profile.update.service.request.UpdateProfileRequest;
import com.student.teacher.profile.update.service.response.ProfileResponse;
import com.student.teacher.profile.update.service.response.UpdateProfileResponse;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/profile/v1")
@Slf4j
public class ProfileController {

	@Autowired
	private ProfileProxy profileProxy;

	/**
	 * 
	 * @param profileRequest
	 * @return
	 */
	@PostMapping("/updateProfile")
	public UpdateProfileResponse updateProfile(@Valid @RequestBody UpdateProfileRequest profileRequest) {
		log.info("Enter updateProfile in ProfileUpdateController email Id {} ", profileRequest.getEmailId());
		UpdateProfileResponse profileResponse = profileProxy.updateProfile(profileRequest);
		log.info("Exit updateProfile in ProfileUpdateController email Id {} ", profileResponse.getEmailId());
		return profileResponse;
	}
	

	/**
	 * 
	 * @param profileRequest
	 * @return
	 */
	@PostMapping("/getProfileById")
	public ProfileResponse getProfileById(@Valid @RequestBody ProfileRequest profileRequest) {
		log.info("Enter getProfileById in ProfileUpdateController email Id {} ", profileRequest.getId());
		ProfileResponse profileResponse = profileProxy.getProfileById(profileRequest);
		log.info("Exit updateProfile in ProfileUpdateController email Id {} ", profileResponse.getEmailId());
		return profileResponse;
	}

}
