package com.project.roomlocationweb.service;

import com.project.roomlocationweb.domain.User;
import com.project.roomlocationweb.dto.UserRegistrationDto;

public interface UserService {
    User registerUser(UserRegistrationDto userDto);
}
