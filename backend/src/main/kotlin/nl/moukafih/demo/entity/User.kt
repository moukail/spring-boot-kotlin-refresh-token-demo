package nl.moukafih.demo.entity

import jakarta.persistence.*
import jakarta.validation.constraints.Email

@Entity
data class User(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false, updatable = false)
    val id: String? = null,
    @field:Email(message = "Email should be valid")
    @Column(nullable = false, unique = true)
    val email: String,
    @Column(nullable = false)
    val password: String,
    @Column(nullable = false)
    val role: String,
)