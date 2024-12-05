package com.example.PMS_Database.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalAdvice {
	@ExceptionHandler(NotFoundException.class)	
	public ResponseEntity<Map<String,String>> notFound(NotFoundException ex){
		Map<String,String> output=new HashMap<String,String>();
		output.put("data", ex.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(output);
	}

}
