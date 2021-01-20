package com.student.teacher.marks.service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.student.teacher.marks.service.entity.MarksEntity;

public interface MarksRepository extends JpaRepository<MarksEntity, Long> {

	Optional<MarksEntity> findByStudentIdAndBelongsTo(Long studentId, int belongsTo);
	
}
