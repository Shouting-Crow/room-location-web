package com.project.roomlocationweb.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegistrationDto {
    private String username;
    private String password;
    private String phoneNumber;
    private String email;
}
