package com.service;

import static org.junit.Assert.*;

import org.junit.Test;
import static org.junit.Assert.*;
import static org.mockito.Mockito.mock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.entity.Project;
import com.repository.NativeRepository;
import com.repository.UserRepository;


public class UserServiceTest {

	@Test
	public void test_signup() {
		UserRepository userRepository = mock(UserRepository.class);
		NativeRepository nativeRepository = mock(NativeRepository.class);
		
		UserService userService = new UserService(userRepository, nativeRepository);
		userService.addUser(null);
	}
	
	@Test
	public void test_get_all_users() {
		UserRepository userRepository = mock(UserRepository.class);
		NativeRepository nativeRepository = mock(NativeRepository.class);
		
		UserService userService = new UserService(userRepository, nativeRepository);
		userService.getAllUsers();
	}
	
	@Test
	public void test_signin() {
		UserRepository userRepository = mock(UserRepository.class);
		NativeRepository nativeRepository = mock(NativeRepository.class);
		
		UserService userService = new UserService(userRepository, nativeRepository);
		userService.getAllUsers();
	}
}
