package com.student.teacher.zuul.api.controller;

import java.util.Objects;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.student.teacher.zuul.api.auth.response.StatusResponse;
import com.student.teacher.zuul.api.jwt.token.util.JWTUtil;
import com.student.teacher.zuul.api.user.data.service.UserDataService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/token/v1")
@Slf4j
public class RefreshTokenController {

	@Autowired
	private JWTUtil jwtUtil;

	@Autowired
	private UserDataService userDataService;

	@GetMapping("/refreshToken")
	public StatusResponse refreshToken(HttpServletRequest request) {
		StatusResponse statusResponse = new StatusResponse();
		try {
			String authHeader = request.getHeader("Authorization");

			String token = null;
			String userName = null;
			if (authHeader != null && authHeader.startsWith("Bearer")) {
				token = authHeader.substring(7);
				userName = jwtUtil.extractUsername(token);
			}
			if (userName != null) {
				UserDetails userDetails = userDataService.loadUserByUsername(userName);

				if (Objects.nonNull(userDetails) && Objects.nonNull(userDetails.getUsername())) {
					String newToken = jwtUtil.refreshToken(token);

					if (StringUtils.hasText(newToken)) {
						log.info("Old Token {} and New Token {} ", token, newToken);
						statusResponse.setStatusCode(200);
						statusResponse.setStatusMessage("JWT token expiration successful.");
					}
				}
			}
		} catch (Exception e) {
			statusResponse.setStatusCode(422);
			statusResponse.setStatusMessage("Exception while refreshing JWT Token");
		}
		return statusResponse;
	}

}
