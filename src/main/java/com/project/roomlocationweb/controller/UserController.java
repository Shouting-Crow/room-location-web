package com.project.roomlocationweb.controller;

import com.project.roomlocationweb.domain.User;
import com.project.roomlocationweb.dto.UserRegistrationDto;
import com.project.roomlocationweb.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody UserRegistrationDto userDto) {
        return userService.registerUser(userDto);
    }

}
