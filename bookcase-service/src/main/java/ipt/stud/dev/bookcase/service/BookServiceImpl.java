package ipt.stud.dev.bookcase.service;

import ipt.stud.dev.bookcase.domain.Book;
import ipt.stud.dev.bookcase.repository.BookRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {

    private final Logger log = LoggerFactory.getLogger(getClass());

    private final BookRepository repository;

    @Autowired
    public BookServiceImpl(BookRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Book> findAll() {
        return (List<Book>) repository.findAll();
    }

    @Override
    public List<Book> findByTitle(String bookTitle) {
        Assert.hasLength(bookTitle);
        return repository.findByTitleContains(bookTitle);
    }

    @Override
    public List<Book> findByGenre(String bookGenre) {
        Assert.hasLength(bookGenre);
        return repository.findByGenreContains(bookGenre);
    }

    @Override
    public List<Book> findByAuthor(String bookAuthor) {
        Assert.hasLength(bookAuthor);
        return repository.findByAuthorContains(bookAuthor);
    }

    @Override
    public Book create(Book book) {
        Book newBook = repository.save(book);

        log.info("new book has been created: " + newBook.getTitle());

        return newBook;
    }

    @Override
    public void saveChanges(Book update) {

        repository.save(update);

        log.info("book has been updated: " + update.getTitle());
    }

    @Override
    public Set<String> getAllGenres() {
        Set<Book> books = repository.findAllGenreAndExcludeId();
        return books.stream().map(Book::getGenre).collect(Collectors.toSet());
    }
}
