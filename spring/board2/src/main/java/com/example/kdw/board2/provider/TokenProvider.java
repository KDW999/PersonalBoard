package com.example.kdw.board2.provider;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class TokenProvider {
    
    //? lombok value가 아닌 springframework value
    //? value properties 파일에 적어둔 데이터를 사용
    @Value("${jwt.security-key}")
    private String SECURITY_KEY;

    //? 토큰 만료기간
    public String create(String email) {

        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

        String jwt = Jwts.builder()
                         .signWith(SignatureAlgorithm.HS256, SECURITY_KEY)
                         .setSubject(email).setIssuedAt(new Date()).setExpiration(expiredDate)
                         .compact();

        return jwt;
    }

    //? 유효성 검사?
    public String validate (String jwt){

        Claims claims = Jwts.parser()
                            .setSigningKey(SECURITY_KEY)
                            .parseClaimsJws(jwt).getBody();

        return claims.getSubject();
    }
}
