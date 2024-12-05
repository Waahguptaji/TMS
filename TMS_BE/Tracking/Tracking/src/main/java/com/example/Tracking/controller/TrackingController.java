package com.example.Tracking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.Tracking.feign.BookingClient;
import com.example.Tracking.model.Booking;
import com.example.Tracking.model.Tracking;
import com.example.Tracking.service.TrackingService;

import java.util.Optional;

@RestController
@RequestMapping("/api/tracking")
public class TrackingController {

    @Autowired
    private TrackingService trackingService;
    @Autowired
    private BookingClient bookingclient;

    // Add or Update Delivery Status
    @PostMapping("/{bookingId}")
    public String updateTracking(@PathVariable String bookingId, @RequestParam String status) {
        trackingService.saveOrUpdateTracking(bookingId, status);
        return "Delivery status for Booking ID " + bookingId + " updated to: " + status;
    }

    // Get Booking Details with Delivery Status
    @GetMapping("/{bookingId}")
    public String getBookingWithTracking(@PathVariable String bookingId) {
        Booking booking = bookingclient.getBookingId(bookingId);
        Optional<Tracking> tracking = trackingService.getTrackingByBookingId(bookingId);

        if (tracking.isPresent()) {
            return "Booking Details: " + booking.getSenderName() +
                   "\nDelivery Status: " + tracking.get().getDeliveryStatus();
        } else {
            return "Booking Details: " + booking.toString() +
                   "\nDelivery Status: Not Available";
        }
    }
}
