package nl.moukafih.demo.service

import nl.moukafih.demo.repository.UserRepository
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class CustomUserDetailsService(private val userRepository: UserRepository) : UserDetailsService {

    private final val logger: Logger = LoggerFactory.getLogger(CustomUserDetailsService::class.java)

    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByEmail(username)
            ?: throw UsernameNotFoundException("User not found with email: $username")

        return User(
            user.email,
            user.password,
            getAuthorities(user.role)
        )
    }

    private fun getAuthorities(role: String): MutableList<GrantedAuthority> {
        logger.info("Role with name: {}", role)
        val authorities = mutableListOf<GrantedAuthority>()
        authorities.add(SimpleGrantedAuthority(role))
        return authorities
    }
}