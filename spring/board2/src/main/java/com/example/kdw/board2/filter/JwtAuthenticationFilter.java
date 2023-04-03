package com.example.kdw.board2.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import com.example.kdw.board2.provider.TokenProvider;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{
    
    @Autowired private TokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
          throws ServletException, IOException {

            try {

                //? Request Header에 있는 Bearer Token을 가져옴
                String jwt = parseToken(request);

                boolean hasJwt = jwt != null && !jwt.equalsIgnoreCase("null");

                //? token있는지 검사
                if(!hasJwt){
                    filterChain.doFilter(request, response);
                    return;
                }

                String email = tokenProvider.validate(jwt);

                AbstractAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, null, AuthorityUtils.NO_AUTHORITIES);
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); 

                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                securityContext.setAuthentication(authenticationToken);
                SecurityContextHolder.setContext(securityContext);

                
            } catch (Exception exception) {
                exception.printStackTrace();
            }

            filterChain.doFilter(request, response);
          }

          //? 토큰 전달
          private String parseToken(HttpServletRequest request){

            String token = request.getHeader("Authorization"); //? header 부분

            boolean hasToken = StringUtils.hasText(token);
            if(!hasToken) return null;

            boolean isBearer = token.startsWith("Bearer "); //? 앞 부분 토큰 지정??, 빈 칸 띄우기 중요
            if(!isBearer) return null;

            String jwt = token.substring(7); //? 위에서 사용한 Bearer 부분 자르기
            return jwt;
          }
}
