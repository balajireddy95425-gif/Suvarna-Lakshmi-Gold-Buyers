package com.srilakshmigoldbuyers.config;

import com.srilakshmigoldbuyers.service.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AdminAuthInterceptor implements HandlerInterceptor {
    private final TokenService tokenService;

    public AdminAuthInterceptor(TokenService tokenService) { this.tokenService = tokenService; }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (HttpMethod.OPTIONS.matches(request.getMethod())) return true;
        String path = request.getRequestURI();
        String context = request.getContextPath();
        if (context != null && !context.isBlank()) path = path.substring(context.length());

        // Public customer-facing endpoints.
        if (isPublic(path, request.getMethod())) return true;

        String auth = request.getHeader("Authorization");
        if (auth == null || !auth.startsWith("Bearer ") || tokenService.validate(auth.substring(7).trim()) == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"success\":false,\"message\":\"Authentication required.\"}");
            return false;
        }
        return true;
    }

    private boolean isPublic(String path, String method) {
        if ("/api/admin/login".equals(path) && HttpMethod.POST.matches(method)) return true;
        if ("/api/gold-rates".equals(path) && HttpMethod.GET.matches(method)) return true;
        if (path.startsWith("/api/gold-rates/") && HttpMethod.GET.matches(method)) return true;
        if ("/api/blogs/published".equals(path) && HttpMethod.GET.matches(method)) return true;
        if (path.startsWith("/api/blogs/slug/") && HttpMethod.GET.matches(method)) return true;
        if ("/api/branches/active".equals(path) && HttpMethod.GET.matches(method)) return true;
        if ("/api/enquiries".equals(path) && HttpMethod.POST.matches(method)) return true;
        if ("/api/appointments".equals(path) && HttpMethod.POST.matches(method)) return true;
        if ("/api/gold-calculations".equals(path) && HttpMethod.POST.matches(method)) return true;
        return false;
    }
}
