package com.example.Tracking.service;

import com.example.Tracking.feign.BookingClient;
import com.example.Tracking.model.Booking;
import com.example.Tracking.model.Tracking;
import com.example.Tracking.repo.TrackingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TrackingService {

    @Autowired
    private BookingClient bookingClient;

    @Autowired
    private TrackingRepository trackingRepository;

    public Tracking saveOrUpdateTracking(String bookingId, String status) {
        Optional<Tracking> existingTracking = trackingRepository.findByBookingId(bookingId);

        Tracking tracking = existingTracking.orElse(new Tracking());
        tracking.setBookingId(bookingId);
        tracking.setDeliveryStatus(status);

        return trackingRepository.save(tracking);
    }

    public Booking getBookingWithTracking(String bookingId) {
        // Fetch booking details from Booking Microservice
        return bookingClient.getBookingId(bookingId);
    }

    public Optional<Tracking> getTrackingByBookingId(String bookingId) {
        return trackingRepository.findByBookingId(bookingId);
    }
}