package ipt.stud.dev.bookcase.controller;

import ipt.stud.dev.bookcase.domain.Book;
import ipt.stud.dev.bookcase.domain.User;
import ipt.stud.dev.bookcase.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
public class BookcaseController {

    @Autowired
    private BookService bookService;

    @PreAuthorize("#oauth2.hasScope('server') or #name.equals('demo')")
    @RequestMapping(path = "/searchTitle/{name}", method = RequestMethod.GET)
    public List<Book> getBookByTitle(@PathVariable String name) {
        return bookService.findByTitle(name);
    }

    @PreAuthorize("#oauth2.hasScope('server') or #name.equals('demo')")
    @RequestMapping(path = "/searchGenre/{name}", method = RequestMethod.GET)
    public List<Book> getBookByGenre(@PathVariable String name) {
        return bookService.findByGenre(name);
    }

    @PreAuthorize("#oauth2.hasScope('server') or #name.equals('demo')")
    @RequestMapping(path = "/searchAuthor/{name}", method = RequestMethod.GET)
    public List<Book> getBookByAuthor(@PathVariable String name) {
        return bookService.findByAuthor(name);
    }

    @RequestMapping(path = "/", method = RequestMethod.PUT)
    public void saveBook(@Valid @RequestBody Book book) {
        bookService.saveChanges(book);
    }

    @RequestMapping(path = "/", method = RequestMethod.POST)
    public Book createNewBook(@Valid @RequestBody Book book) {
        return bookService.create(book);
    }
}
