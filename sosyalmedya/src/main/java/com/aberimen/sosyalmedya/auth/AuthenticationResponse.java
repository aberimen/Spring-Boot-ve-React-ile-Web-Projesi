package com.aberimen.sosyalmedya.auth;

import com.aberimen.sosyalmedya.user.vm.UserVM;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthenticationResponse {

    private  String token;
    
    private  UserVM user;
}
