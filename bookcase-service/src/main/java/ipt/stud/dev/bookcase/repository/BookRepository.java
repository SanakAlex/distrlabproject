package ipt.stud.dev.bookcase.repository;

import ipt.stud.dev.bookcase.domain.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {

    List<Book> findByTitleContains(String title);
    List<Book> findByAuthorContains(String author);
    List<Book> findByGenreContains(String genre);

}
