package com.example.User.config;

public class NotFoundException extends RuntimeException{
	public NotFoundException(String msg) {
		super(msg);
	}
}