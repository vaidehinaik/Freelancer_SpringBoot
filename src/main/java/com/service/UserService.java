package com.service;

import com.entity.User;
import com.repository.NativeRepository;
import com.repository.ProjectRepository;
import com.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.transaction.HeuristicMixedException;
import javax.transaction.HeuristicRollbackException;
import javax.transaction.RollbackException;
import javax.transaction.SystemException;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private NativeRepository nativeRepository;

    public UserService() {
    	
    }
    
    public UserService(UserRepository userRepository, NativeRepository nativeRepository) {
    	this.userRepository = userRepository;
    	this.nativeRepository = nativeRepository;
    }

    
    public Iterable<User> getAllUsers(){
        return userRepository.findAll();
    }

    public void addUser(User user){
        userRepository.save(user);
    }
    
    public void update(User user) {
       nativeRepository.updateUserInfo(user);
    }
    
    public User findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public List<User> login(String username, String password){
        return userRepository.findByUsernameAndPassword(username, password);
    }
}