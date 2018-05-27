package ipt.stud.dev.bookcase.service;

import ipt.stud.dev.bookcase.domain.Book;

import java.util.List;

public interface BookService {

    /**
     * Finds book by given title
     *
     * @param bookTitle
     * @return found book
     */
    List<Book> findByTitle(String bookTitle);

    /**
     * Finds book by given genre name
     *
     * @param bookGenre
     * @return found book
     */
    List<Book> findByGenre(String bookGenre);

    /**
     * Finds book by given author name
     *
     * @param bookAuthor
     * @return found book
     */
    List<Book> findByAuthor(String bookAuthor);

    /**
     * Creates new book
     *
     * @param book
     * @return created book
     */
    Book create(Book book);

    /**
     * Validates and applies incoming book updates
     *
     * @param update
     */
    void saveChanges(Book update);
}
