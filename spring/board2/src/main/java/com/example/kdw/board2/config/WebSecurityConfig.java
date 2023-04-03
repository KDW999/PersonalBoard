package com.example.kdw.board2.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.kdw.board2.filter.JwtAuthenticationFilter;

//
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    //? WebSecurity 구현
   @Autowired private JwtAuthenticationFilter jwtAuthenticationFilter;

   @Bean
   protected SecurityFilterChain config(HttpSecurity httpSecurity) throws Exception{

      httpSecurity
         .cors().and()
         .csrf().disable()
         .httpBasic().disable()
         .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
         .authorizeRequests()
         .antMatchers("/auth/**", "/file/**", "/api/**").permitAll()
         .anyRequest().authenticated().and()
         .exceptionHandling().authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));

          //.antMatchers("/api/board/my-list").authenticated()
         httpSecurity.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

         return httpSecurity.build();
   }
}
