package com.student.teacher.eureka.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class StudentTeacherDataEurekaServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentTeacherDataEurekaServerApplication.class, args);
	}

}
