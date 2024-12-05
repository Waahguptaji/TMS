package com.example.Tracking.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.Tracking.model.Booking;

@FeignClient(name="bookings" , url="http://localhost:8888/api/bookings")
public interface BookingClient {
	 @GetMapping("/{bookingId}")
	    public Booking getBookingId(@PathVariable String bookingId);

}
