package ipt.stud.dev.bookcase.repository;

import ipt.stud.dev.bookcase.domain.Book;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {

    List<Book> findByTitleContains(String title);
    List<Book> findByAuthorContains(String author);
    List<Book> findByGenreContains(String genre);

    @Query("Select b.genre from Book b")
    Set<String> getAllGenres();

}
