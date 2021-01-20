package com.student.details.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
public class StudentDetailsServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentDetailsServiceApplication.class, args);
	}
	
}
