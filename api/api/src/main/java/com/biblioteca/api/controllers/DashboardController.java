package com.biblioteca.api.controllers;

import com.biblioteca.api.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<?> buscarDashboard() {

        try {

            return ResponseEntity.ok(
                    dashboardService.buscarDadosDashboard()
            );

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(
                    e.getMessage()
            );

        }
    }
}