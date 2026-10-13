package com.srilakshmigoldbuyers.service;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenService {
    private static final Duration TTL = Duration.ofHours(8);
    private final SecureRandom random = new SecureRandom();
    private final Map<String, Session> sessions = new ConcurrentHashMap<>();

    public String create(String adminId, String username, String role) {
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
        sessions.put(token, new Session(adminId, username, role, Instant.now().plus(TTL)));
        return token;
    }

    public Session validate(String token) {
        if (token == null || token.isBlank()) return null;
        Session session = sessions.get(token);
        if (session == null) return null;
        if (Instant.now().isAfter(session.expiresAt())) {
            sessions.remove(token);
            return null;
        }
        return session;
    }

    public void revoke(String token) {
        if (token != null) sessions.remove(token);
    }

    public record Session(String adminId, String username, String role, Instant expiresAt) {}
}
