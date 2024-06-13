package nl.moukafih.demo.repository

import nl.moukafih.demo.entity.RefreshToken
import nl.moukafih.demo.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RefreshTokenRepository : JpaRepository<RefreshToken, Long> {
    fun findByToken(token: String): RefreshToken?
    fun deleteByUser(user: User)
}