package com.login.service.controller;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.login.service.jwt.token.generator.JWTTokenGenerator;
import com.login.service.request.LoginRequest;
import com.login.service.response.AuthenticationResponse;
import com.login.service.serviceinvoker.LoginServiceInvoker;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/login/v1")
@Slf4j
public class LoginController {

	@Autowired
	private LoginServiceInvoker loginServiceInvoker;

	@Autowired
	private JWTTokenGenerator jwtTokenGenerator;

	@PostMapping("/authenticate")
	@ResponseBody
	public AuthenticationResponse authenticate(@RequestBody LoginRequest loginDTO) {
		log.info("Entred method authenticate in LoginController");

		AuthenticationResponse authenticationResponse = loginServiceInvoker.authenticate(loginDTO);

		if (Objects.nonNull(authenticationResponse.getStatusResponse())
				&& authenticationResponse.getStatusResponse().getStatusCode() == 200) {
			String jwtToken = jwtTokenGenerator.generateToken(loginDTO.getEmailId());
			if (StringUtils.hasText(jwtToken)) {
				authenticationResponse.setJwtToken(jwtToken);
			}
		}
		log.info("Exit method authenticate in LoginController");

		return authenticationResponse;
	}

}
