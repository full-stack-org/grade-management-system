package com.student.teacher.cloud.config.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class StudentTeacherCloudConfigServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentTeacherCloudConfigServerApplication.class, args);
	}

}

