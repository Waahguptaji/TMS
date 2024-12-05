package com.example.User.service;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.User.Entity.Booking;



@FeignClient(value="Bookings" , url="http://localhost:8888/api/bookings")
public interface BookingService {
	@GetMapping("/user/{userId}")
    public List<Booking> getBookingWithUserDetails(@PathVariable String userId);
}	
