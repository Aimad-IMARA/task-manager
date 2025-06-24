package com.aimad.taskmanager.backend.controller;

import com.aimad.taskmanager.backend.dto.UserDto;
import com.aimad.taskmanager.backend.dto.AuthResponse;
import com.aimad.taskmanager.backend.model.User;
import com.aimad.taskmanager.backend.service.UserService;
import com.aimad.taskmanager.backend.util.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDto request) {
        if (userService.existsByUsername(request.getUsername())) {
            Map<String, String> errors = new HashMap<>();
            errors.put("username", "This username already exists.");
            return ResponseEntity.badRequest().body(errors);        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        userService.saveUser(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody UserDto request) {
       authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(), request.getPassword()
                )
        );
        String token = jwtUtil.generateToken(request.getUsername());
        return ResponseEntity.ok(new AuthResponse(token));
    }
}
