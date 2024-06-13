package nl.moukafih.demo

import nl.moukafih.demo.controller.AuthController
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class DemoApplicationTests {

	@Autowired
	lateinit var authController: AuthController

	@Test
	@DisplayName("First test")
	fun contextLoads() {
		assertThat(authController).isNotNull
	}
}
