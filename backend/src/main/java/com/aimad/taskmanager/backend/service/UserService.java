package com.aimad.taskmanager.backend.service;

import com.aimad.taskmanager.backend.model.User;

public interface UserService {
    User saveUser(User user);
    User findByUsername(String username);
    boolean existsByUsername(String username);
}