package com.repository;

import com.entity.Project;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

public interface ProjectRepository extends CrudRepository<Project, Long> {
	List<Project> findAll();
}
