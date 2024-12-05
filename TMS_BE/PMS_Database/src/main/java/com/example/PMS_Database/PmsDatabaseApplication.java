package com.example.PMS_Database;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication

public class PmsDatabaseApplication {

	public static void main(String[] args) {
		SpringApplication.run(PmsDatabaseApplication.class, args);
	}

}
