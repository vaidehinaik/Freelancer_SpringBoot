package com.repository;

import com.entity.User;

import org.hibernate.annotations.NamedNativeQuery;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

public interface UserRepository extends CrudRepository<User, Long> {
	User findByUsername(String username);
	List<User> findByUsernameAndPassword(String username, String password);
	List<User> findAll();
}