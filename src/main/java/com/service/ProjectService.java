package com.service;

import com.entity.Project;
import com.repository.NativeRepository;
import com.repository.ProjectRepository;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private NativeRepository nativeReporsitory;
    
    public ProjectService() {
    	
    }
    
    public ProjectService(ProjectRepository projectRepository, NativeRepository nativeReporsitory) {
    	this.projectRepository = projectRepository;
    	this.nativeReporsitory = nativeReporsitory;
    }

//    public Iterable<Project> getAllProjects(){
//       return projectRepository.findAll();
//    }

    public void addProject(Project project){
    	projectRepository.save(project);
    }
    
    public List<HashMap> getUserProjects(String userName) {
    	return nativeReporsitory.getUserProjects(userName);
    }
    public List<HashMap> getAllProjects() {
    	return nativeReporsitory.getAllProjects();
    }
    public List<HashMap> getUserBidProjects(String userName) {
    	return nativeReporsitory.getUserBidProjects(userName);
    }
    public HashMap getProjectAndBids(Integer projectId) {
    	return nativeReporsitory.getProjectAndBids(projectId);
    }
    
}
