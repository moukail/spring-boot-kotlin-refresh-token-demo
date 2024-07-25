package nl.moukafih.demo.controller

import nl.moukafih.demo.dto.LoginDTO
import nl.moukafih.demo.dto.RefreshTokenDTO
import nl.moukafih.demo.service.AuthService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/auth")
class AuthController(
    @Autowired private val authService: AuthService
) {
    private final val logger: Logger = LoggerFactory.getLogger(AuthController::class.java)

    @PostMapping("/login")
    fun login(@RequestBody loginDTO: LoginDTO): ResponseEntity<Any> {
        val tokens = authService.login(loginDTO)
        return if (tokens == null) {
            ResponseEntity.badRequest().body("Invalid credentials")
        } else {
            ResponseEntity.ok(tokens)
        }
    }

    @PostMapping("/refresh-token")
    fun refreshToken(@RequestBody refreshTokenDTO: RefreshTokenDTO): ResponseEntity<Any> {
        logger.warn("refreshToken")
        val tokens = authService.refreshToken(refreshTokenDTO.refreshToken)
        return if (tokens == null) {
            ResponseEntity.badRequest().body("Invalid refresh token")
        } else {
            ResponseEntity.ok(tokens)
        }
    }
}