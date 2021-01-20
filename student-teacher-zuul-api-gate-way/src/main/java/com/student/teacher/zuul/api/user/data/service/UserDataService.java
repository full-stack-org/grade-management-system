package com.student.teacher.zuul.api.user.data.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.student.teacher.zuul.api.auth.proxy.AuthProxy;
import com.student.teacher.zuul.api.auth.request.AuthRequest;
import com.student.teacher.zuul.api.auth.response.AuthResponse;

@Service
public class UserDataService implements UserDetailsService {

	@Autowired
	private AuthProxy authProxy;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		AuthRequest loadUserByEmailRequest = new AuthRequest();
		loadUserByEmailRequest.setEmailId(username);

		AuthResponse userResponse = authProxy.loadUserByEmailId(loadUserByEmailRequest);

		List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(userResponse.getRole()));

		return new org.springframework.security.core.userdetails.User(userResponse.getEmailId(),userResponse.getEmailId(), authorities);
	}

}