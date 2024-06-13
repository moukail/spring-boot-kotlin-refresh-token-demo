package nl.moukafih.demo.entity

import jakarta.persistence.*

@Entity
data class RefreshToken(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long?,
    val token: String,
    @ManyToOne
    @JoinColumn(name = "user_id")
    val user: User
)