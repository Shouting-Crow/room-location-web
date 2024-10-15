package com.project.roomlocationweb.service;

import com.project.roomlocationweb.domain.User;
import com.project.roomlocationweb.dto.UserRegistrationDto;
import com.project.roomlocationweb.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public User registerUser(UserRegistrationDto userDto) {
        String encryptedPassword = bCryptPasswordEncoder.encode(userDto.getPassword());

        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setPassword(encryptedPassword);
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setEmail(userDto.getEmail());

        return userRepository.save(user);
    }
}
