package com.controller;

import com.entity.Project;
import com.entity.User;
import com.service.ProjectService;
import com.service.UserService;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpSession;

@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000", allowCredentials="true")
@RequestMapping(path="/projects") // This means URL's start with /demo (after Application path)
public class ProjectController {
    @Autowired
    private ProjectService projectService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping(path="/postproject", consumes = MediaType.APPLICATION_JSON_VALUE) 
    public  ResponseEntity<?> postproject (@RequestBody String info) {
    	JSONObject jsonobj = new JSONObject(info);
    	User user = userService.findByUsername(jsonobj.getString("username"));
    	Project project = new Project();
    	project.setOwnerUserId(user.getUserId());
    	project.setTitle(jsonobj.getString("title"));
    	project.setDescription(jsonobj.getString("description"));
    	project.setBudgetLow(jsonobj.getInt("budgetLow"));
    	project.setBudgethigh(jsonobj.getInt("budgetHigh"));
    	JSONArray skills_arr = jsonobj.getJSONArray("skills");
    	List<String> list = new ArrayList<String>();
    	for(int i = 0; i < skills_arr.length(); i++){
    	    list.add(skills_arr.getString(i));
    	}
    	String sk = String.join(",", list);
    	project.setSkills(sk);
        projectService.addProject(project);
        return new ResponseEntity("project posted successfully",HttpStatus.CREATED);
    }
    
    @GetMapping(path="/allProjects" , produces = MediaType.APPLICATION_JSON_VALUE)
    public  ResponseEntity<HashMap> allProjects () {
    	List<HashMap> objects = projectService.getAllProjects();
    	return new ResponseEntity(objects, HttpStatus.OK);
    }
    
    @PostMapping(path="/userprojects", consumes = MediaType.APPLICATION_JSON_VALUE) 
    public  ResponseEntity<HashMap> userprojects (@RequestBody User user) {
    	List<HashMap> objects = projectService.getUserProjects(user.getUsername());
    	return new ResponseEntity(objects, HttpStatus.OK);
    }
    
    @PostMapping(path="/projectandbids", consumes = MediaType.APPLICATION_JSON_VALUE) 
    public  ResponseEntity<HashMap> projectandbids (@RequestBody Project project) {
    	HashMap objects = projectService.getProjectAndBids(project.getProjectId());
    	return new ResponseEntity(objects, HttpStatus.OK);
    }

    @PostMapping(path="/userbidprojects", consumes = MediaType.APPLICATION_JSON_VALUE) 
    public  ResponseEntity<HashMap> userbidprojects (@RequestBody User user) {
    	List<HashMap> objects = projectService.getUserBidProjects(user.getUsername());
    	return new ResponseEntity(objects, HttpStatus.OK);
    }
    
    
}