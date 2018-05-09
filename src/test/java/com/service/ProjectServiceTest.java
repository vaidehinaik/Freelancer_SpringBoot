package com.service;

import static org.junit.Assert.*;
import static org.mockito.Mockito.mock;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.entity.Project;
import com.repository.NativeRepository;
import com.repository.ProjectRepository;


public class ProjectServiceTest {

	@MockBean
	ProjectRepository projectRepository;

	@MockBean
	NativeRepository nativeRepository;
	
	@Autowired
	ProjectService projectService;
	
	@Test
	public void testAddProject() {
		projectRepository = mock(ProjectRepository.class);
		nativeRepository = mock(NativeRepository.class);
		
		projectService = new ProjectService(projectRepository, nativeRepository);
		projectService.addProject(null);
	}

	@Test
	public void testGetAllProjects() {
		projectRepository = mock(ProjectRepository.class);
		nativeRepository = mock(NativeRepository.class);
		
		projectService = new ProjectService(projectRepository, nativeRepository);
		projectService.getAllProjects();
	}
	
	@Test
	public void testGetUserProjects() {
		projectRepository = mock(ProjectRepository.class);
		nativeRepository = mock(NativeRepository.class);
		
		projectService = new ProjectService(projectRepository, nativeRepository);
		projectService.getUserProjects(null);
	}
	
	@Test
	public void testGetUserBidProjects() {
		projectRepository = mock(ProjectRepository.class);
		nativeRepository = mock(NativeRepository.class);
		
		projectService = new ProjectService(projectRepository, nativeRepository);
		projectService.getUserBidProjects(null);
	}
	
	@Test
	public void testGetUserProjectAndBids() {
		projectRepository = mock(ProjectRepository.class);
		nativeRepository = mock(NativeRepository.class);
		
		projectService = new ProjectService(projectRepository, nativeRepository);
		projectService.getProjectAndBids(null);
	}
}
