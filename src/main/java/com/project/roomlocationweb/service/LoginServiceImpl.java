package com.project.roomlocationweb.service;

import com.project.roomlocationweb.domain.User;
import com.project.roomlocationweb.dto.LoginDto;
import com.project.roomlocationweb.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public String login(LoginDto loginDto) {
        Optional<User> userOptional = userRepository.findByUsername(loginDto.getUsername());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
                return "로그인 성공";
            } else {
                return "비밀번호가 일치하지 않습니다.";
            }
        } else {
            return "아이디가 존재하지 않습니다.";
        }
    }
}
