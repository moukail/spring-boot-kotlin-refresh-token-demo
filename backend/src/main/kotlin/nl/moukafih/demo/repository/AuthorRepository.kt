package nl.moukafih.demo.repository

import nl.moukafih.demo.entity.Author
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource
interface AuthorRepository : JpaRepository<Author, String> {}