package com.login.service.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(Include.NON_NULL)
public class AuthenticationResponse {
	private int id;
	private boolean authenticatedSuccesssfully;
	private String jwtToken;
	private StatusResponse statusResponse;
	
}
