package com.forgot.password.service.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.forgot.password.service.proxy.PasswordProxy;
import com.forgot.password.service.request.FindByEmailRequest;
import com.forgot.password.service.request.PasswordUpdateRequest;
import com.forgot.password.service.response.GetByEmailIdResponse;
import com.forgot.password.service.response.PasswordUpdateResponse;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/forgot/v1")
@Slf4j
public class PasswordUpdateController {

	@Autowired
	private PasswordProxy passwordProxy;

	@PostMapping("/updatePassword")
	public PasswordUpdateResponse updatePassword(@Valid @RequestBody PasswordUpdateRequest profileRequest) {
		log.info("Enter updatePassword in PasswordUpdateController email Id {} ", profileRequest.getEmailId());
		PasswordUpdateResponse passwordUpdateResponse = passwordProxy.updatePassword(profileRequest);
		log.info("Exit updatePassword in PasswordUpdateController Password Successfully {} ",
				passwordUpdateResponse.isPasswordUpdatedSuccessfully());
		return passwordUpdateResponse;
	}

	/**
	 * 
	 * @param emailRequest
	 * @return
	 */
	@PostMapping("/findByEmailId")
	public GetByEmailIdResponse findByEmailId(@Valid @RequestBody FindByEmailRequest emailRequest) {
		log.info("Enter findByEmailId in PasswordUpdateController email Id {} ", emailRequest.getEmailId());
		GetByEmailIdResponse getByEmailIdResponse = passwordProxy.findByEmailId(emailRequest);
		log.info("Exit findByEmailId in PasswordUpdateController Password Successfully {} ",
				getByEmailIdResponse.getEmailId());
		return getByEmailIdResponse;
	}

}
