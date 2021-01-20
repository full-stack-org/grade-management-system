package com.student.teacher.marks.service.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicUpdate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "marks")
@DynamicUpdate
public class MarksEntity {
	@Id
	private Long studentId;
	private int teluguMarks;
	private int englishMarks;
	private int hindiMarks;
	private String grade;
	private int belongsTo;
}
