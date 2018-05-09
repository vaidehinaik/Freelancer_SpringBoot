package com.controller;

import com.entity.User;
import com.service.UserService;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

@Controller    // This means that this class is a Controller
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials="true")
@RequestMapping(path="/users") // This means URL's start with /demo (after Application path)
public class UserController {
    @Autowired
    private UserService userService;
    
    @Autowired
    BCryptPasswordEncoder bcryptEncoder;

    @PostMapping(path="/add",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public  ResponseEntity<?> addNewUser (@RequestBody User user) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        userService.addUser(user);
        System.out.println("Saved");
        return new ResponseEntity(null,HttpStatus.CREATED);
    }

    @GetMapping(path="/all",produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON with the users
        return userService.getAllUsers();
    }

    @PostMapping(path="/login",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody String loginRequest, HttpSession session)
    {
    	try {
	        JSONObject jsonObject = new JSONObject(loginRequest);
	        String encryptedPassword = bcryptEncoder.encode(jsonObject.getString("password"));
	
	        List<User> userList = userService.login(jsonObject.getString("username"), encryptedPassword);
	        if (userList.size() == 1) {
	        	return new ResponseEntity(HttpStatus.OK);
	        } else {
	        	return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
	        }
    	} catch (Exception ex) {
    		System.out.println(ex.getMessage());
    	}
    	return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    @PostMapping(path="/signup",consumes = MediaType.APPLICATION_JSON_VALUE) 
    public  ResponseEntity<?> signup (@RequestBody User user) {
    	try {
	        userService.addUser(user);
	        return new ResponseEntity("user created successfully",HttpStatus.CREATED);
    	} catch (Exception ex) {
    		System.out.println(ex.getMessage());
    		return new ResponseEntity(HttpStatus.UNAUTHORIZED);
    	}
    }
    
    @PostMapping(path="/userinfo",consumes = MediaType.APPLICATION_JSON_VALUE) 
    public  ResponseEntity<?> userinfo (@RequestBody String username) {
    	JSONObject jsonObject = new JSONObject(username);
        User user = userService.findByUsername(jsonObject.getString("username"));
        return new ResponseEntity(user, HttpStatus.CREATED);
    }
    
    @PostMapping(path="/updateuserinfo",consumes = MediaType.APPLICATION_JSON_VALUE) 
    public ResponseEntity<?> updateuserinfo (@RequestBody String info) {
	   JSONObject jsonobj = new JSONObject(info);
	   	User user = new User();
	   	user.setUserId(jsonobj.getInt("userId"));
	   	user.setName(jsonobj.getString("name"));
	   	user.setUsername(jsonobj.getString("username"));
	   	user.setContact(jsonobj.getString("contact"));
	   	user.setAboutMe(jsonobj.getString("aboutMe"));
	   	JSONArray skills_arr = jsonobj.getJSONArray("skills");
	   	List<String> list = new ArrayList<String>();
	   	for(int i = 0; i < skills_arr.length(); i++){
	   	    list.add(skills_arr.getString(i));
	   	}
	   	String skills_str = String.join(",", list);
	   	user.setSkills(skills_str);
	   	try {
	   		userService.update(user);
	   		return new ResponseEntity("user info updated", HttpStatus.OK);
	   	} catch (Exception ex) {
	   		System.out.println("Error: " + ex.getMessage());
	   		return new ResponseEntity("failed to update userinfo", HttpStatus.UNAUTHORIZED);
	   	}
    }

	@PostMapping(value = "/logout")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ResponseEntity<?> logout(HttpSession session) {
	    System.out.println(session.getAttribute("name"));
	    session.invalidate();
	    return  new ResponseEntity(HttpStatus.OK);
	}
}