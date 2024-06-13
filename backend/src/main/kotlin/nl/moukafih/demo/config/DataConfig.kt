package nl.moukafih.demo.config

import nl.moukafih.demo.entity.User
import nl.moukafih.demo.repository.UserRepository
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.ApplicationRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.password.PasswordEncoder

@Configuration
class DataConfig {

    @Autowired
    lateinit var passwordEncoder: PasswordEncoder

    private final val logger: Logger = LoggerFactory.getLogger(DataConfig::class.java)

    @Bean
    fun databaseInitializer(userRepository: UserRepository) = ApplicationRunner {

        val password = passwordEncoder.encode("pass_1234")

        userRepository.save(
            User(email = "admin1@test.com", role = "ROLE_AMIN", password = password)
        )

        userRepository.save(
            User(email = "user1@test.com", role = "ROLE_USER", password = password)
        )
    }
}