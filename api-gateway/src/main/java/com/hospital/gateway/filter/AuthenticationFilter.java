package com.hospital.gateway.filter;

import com.hospital.gateway.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class AuthenticationFilter extends OncePerRequestFilter {

    private final RouteValidator validator;
    private final JwtService jwtUtil;

    public AuthenticationFilter(RouteValidator validator, JwtService jwtUtil) {
        this.validator = validator;
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        System.out.println("AuthenticationFilter processing: " + request.getRequestURI());
        if (validator.isSecured.test(request)) {
            System.out.println("Request is SECURED");
            if (request.getHeader(HttpHeaders.AUTHORIZATION) == null
                    || request.getHeader(HttpHeaders.AUTHORIZATION).isEmpty()) {
                System.out.println("Missing Authorization Header");
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing authorization header");
                return;
            }

            String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                authHeader = authHeader.substring(7);
            }
            try {
                jwtUtil.validateToken(authHeader);
                System.out.println("Token Validated");
            } catch (Exception e) {
                System.out.println("Token Validation Failed: " + e.getMessage());
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized access to application");
                return;
            }
        } else {
            System.out.println("Request is PUBLIC");
        }
        filterChain.doFilter(request, response);
    }
}
