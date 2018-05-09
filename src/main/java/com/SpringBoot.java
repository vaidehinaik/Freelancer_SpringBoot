package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.repository.NativeRepository;

@SpringBootApplication
public class SpringBoot {
    public static void main(String[] args){
        SpringApplication.run(SpringBoot.class,args);
    }
    
    @Bean
    public BCryptPasswordEncoder  AuthenticationFilter() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public NativeRepository  NativeReporsitary() {
        return new NativeRepository();
    }

}