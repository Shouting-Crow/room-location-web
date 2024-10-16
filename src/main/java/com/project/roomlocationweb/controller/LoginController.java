package com.project.roomlocationweb.controller;

import com.project.roomlocationweb.domain.User;
import com.project.roomlocationweb.dto.LoginDto;
import com.project.roomlocationweb.repository.UserRepository;
import com.project.roomlocationweb.service.LoginService;
import com.project.roomlocationweb.util.JwtTokenProvider;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class LoginController {

    private final LoginService loginService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        String loginResult = loginService.login(loginDto);

        if ("로그인 성공".equals(loginResult)) {
            String token = jwtTokenProvider.generateToken(loginDto.getUsername());
            return ResponseEntity.ok(Map.of("token", token));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(loginResult);
        }
    }

}
