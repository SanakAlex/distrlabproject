package ipt.stud.dev.bookcase.repository;

import ipt.stud.dev.bookcase.domain.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface BookRepository extends MongoRepository<Book, String> {

    List<Book> findByTitleContains(String title);
    List<Book> findByAuthorContains(String author);
    List<Book> findByGenreContains(String genre);

    @Query(fields = "{'genre': 1, _id: 0}")
    Set<String> getAllGenres();

}
