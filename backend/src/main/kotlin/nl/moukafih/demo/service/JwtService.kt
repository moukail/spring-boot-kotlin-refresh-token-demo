package nl.moukafih.demo.service

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.exceptions.JWTVerificationException
import com.auth0.jwt.interfaces.DecodedJWT
import com.auth0.jwt.interfaces.JWTVerifier

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*

@Component
class JwtService(
    @Value("\${jwt.secret}") private val secret: String
) {
    private fun getAlgorithm(): Algorithm {
        return Algorithm.HMAC256(secret.toByteArray())
    }

    fun generateAccessToken(username: String): String {
        return JWT.create()
            .withSubject(username)
            .withIssuedAt(Date())
            .withExpiresAt(Date(System.currentTimeMillis() + 1000 * 60 * 15)) // 15 minutes
            .sign(getAlgorithm())
    }

    fun generateRefreshToken(username: String): String {
        return JWT.create()
            .withSubject(username)
            .withIssuedAt(Date())
            .withExpiresAt(Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7)) // 7 days
            .sign(getAlgorithm())
    }

    fun validateToken(token: String): Boolean {
        return try {
            val verifier: JWTVerifier = JWT.require(getAlgorithm()).build()
            verifier.verify(token)
            true
        } catch (exception: JWTVerificationException) {
            false
        }
    }

    fun getUsernameFromToken(token: String): String {
        val decodedJWT: DecodedJWT = JWT.decode(token)
        return decodedJWT.subject
    }
}