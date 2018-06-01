package ipt.stud.dev.bucket.domain;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class Bucket implements Serializable {

    private static final long serialVersionUID = 1234321L;

    private Map<String,Book> books = new HashMap<>();

    public Map<String,Book> getBooks() {
        return books;
    }

    public void setBooks(Map<String,Book> books) {
        this.books = books;
    }
}
