package ipt.stud.dev.bookcase.domain;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.Objects;

@Document(collection = "books")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Book {

    @Id
    private String id;

    @Length(min = 1, max = 500)
    private String title;

    @Length(min = 0, max = 20_000)
    private String shortDescription;

    @NotNull
    private String author;

    @NotNull
    private String genre;

    private Double price;

    private Integer availableCount;

    private Integer orderedCount;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getAvailableCount() {
        return availableCount;
    }

    public void setAvailableCount(Integer availableCount) {
        this.availableCount = availableCount;
    }

    public Integer getOrderedCount() {
        return orderedCount;
    }

    public void setOrderedCount(Integer orderedCount) {
        this.orderedCount = orderedCount;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Book book = (Book) o;
        return Objects.equals(id, book.id) &&
                Objects.equals(title, book.title) &&
                Objects.equals(shortDescription, book.shortDescription) &&
                Objects.equals(author, book.author) &&
                Objects.equals(genre, book.genre) &&
                Objects.equals(price, book.price) &&
                Objects.equals(availableCount, book.availableCount) &&
                Objects.equals(orderedCount, book.orderedCount);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, title, shortDescription, author, genre, price, availableCount, orderedCount);
    }
}
