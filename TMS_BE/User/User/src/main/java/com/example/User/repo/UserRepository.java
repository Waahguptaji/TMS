package com.example.User.repo;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.User.Entity.User;


@Repository
public interface UserRepository extends JpaRepository<User, String> {
	
	public Optional<User>findByUsernameAndPassword(String username,String password);
	Optional<User> findByUsername(String username);
	User findByUserId(String userId);
	//Optional<User> findByUserNa
	boolean existsById(String userId);
}