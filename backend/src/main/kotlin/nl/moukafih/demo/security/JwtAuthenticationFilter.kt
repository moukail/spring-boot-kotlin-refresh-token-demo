package nl.moukafih.demo.security

import nl.moukafih.demo.service.JwtService

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import nl.moukafih.demo.controller.AuthController
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpHeaders
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class JwtAuthenticationFilter(private val jwtService: JwtService) : OncePerRequestFilter() {

    private final val logger: Logger = LoggerFactory.getLogger(JwtAuthenticationFilter::class.java)

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, filterChain: FilterChain) {
        val authHeader = request.getHeader(HttpHeaders.AUTHORIZATION)

        logger.warn("doFilterInternal")

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }



        val token = authHeader.substring(7)
        if (!jwtService.validateToken(token)) {
            filterChain.doFilter(request, response);
            return;
        }



        val username = jwtService.getUsernameFromToken(token)



        val authentication = UsernamePasswordAuthenticationToken(username, null, listOf())
        logger.warn(authentication.isAuthenticated)
        authentication.details = WebAuthenticationDetailsSource().buildDetails(request)

        SecurityContextHolder.getContext().authentication = authentication
        filterChain.doFilter(request, response)
    }
}