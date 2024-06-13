package nl.moukafih.demo.service

import nl.moukafih.demo.dto.LoginDTO
import nl.moukafih.demo.entity.RefreshToken
import nl.moukafih.demo.repository.RefreshTokenRepository
import nl.moukafih.demo.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    @Autowired private val userRepository: UserRepository,
    @Autowired private val refreshTokenRepository: RefreshTokenRepository,
    @Autowired private val jwtService: JwtService,
    @Autowired private val passwordEncoder: PasswordEncoder
) {

    fun login(loginDTO: LoginDTO): Map<String, String>? {
        val user = userRepository.findByEmail(loginDTO.email)
        if (user == null || !passwordEncoder.matches(loginDTO.password, user.password)) {
            return null
        }

        val accessToken = jwtService.generateAccessToken(loginDTO.email)
        val refreshToken = jwtService.generateRefreshToken(loginDTO.email)

        val token = RefreshToken(id = null, token = refreshToken, user = user)
        refreshTokenRepository.save(token)

        return mapOf("accessToken" to accessToken, "refreshToken" to refreshToken)
    }

    fun refreshToken(refreshToken: String): Map<String, String>? {
        val token = refreshTokenRepository.findByToken(refreshToken)
        if (token == null || !jwtService.validateToken(refreshToken)) {
            return null
        }

        val email = jwtService.getUsernameFromToken(refreshToken)
        val newAccessToken = jwtService.generateAccessToken(email)

        return mapOf("accessToken" to newAccessToken)
    }
}