package nl.moukafih.demo.config

import nl.moukafih.demo.security.JwtAuthenticationFilter
import nl.moukafih.demo.service.JwtService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler
import org.springframework.security.access.hierarchicalroles.RoleHierarchy
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.invoke
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
class SecurityConfig(private val jwtService: JwtService) {

    private final val logger: Logger = LoggerFactory.getLogger(SecurityConfig::class.java)

    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        logger.warn("filterChain")
        http {
            csrf { disable() }
            authorizeHttpRequests {
                authorize("/auth/**", permitAll)
                //authorize(anyRequest, authenticated)
            }
            addFilterBefore(JwtAuthenticationFilter(jwtService), UsernamePasswordAuthenticationFilter::class.java)
        }
        return http.build()
    }

    @Bean
    fun roleHierarchy(): RoleHierarchy {
        val roleHierarchy = RoleHierarchyImpl()
        //roleHierarchy.setHierarchy("ROLE_ADMIN > ROLE_MANAGER > ROLE_USER > ROLE_ANONYMOUS")
        roleHierarchy.setHierarchy(
            """
            ROLE_ADMIN > ROLE_MANAGER
            ROLE_MANAGER > ROLE_USER
            ROLE_USER > ROLE_ANONYMOUS
        """.trimIndent()
        )
        return roleHierarchy
    }

    @Bean
    fun methodSecurityExpressionHandler(roleHierarchy: RoleHierarchy) : MethodSecurityExpressionHandler {
        val handler = DefaultMethodSecurityExpressionHandler()
        handler.setRoleHierarchy(roleHierarchy)
        return handler
    }
}