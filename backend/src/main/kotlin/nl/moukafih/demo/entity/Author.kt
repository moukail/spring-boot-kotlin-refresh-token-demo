package nl.moukafih.demo.entity

import jakarta.persistence.*
import nl.moukafih.demo.enum.Gender
import java.util.Date

@Entity
data class Author(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false, updatable = false)
    val id: String? = null,
    @Column(nullable = false)
    var firstName: String,
    @Column(nullable = false)
    var lastName: String,
    @Column(nullable = true)
    var birthday: Date?,
    @Enumerated(EnumType.ORDINAL)
    @Column
    var gender: Gender
)
