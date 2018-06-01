package ipt.stud.dev.bucket.service;

import ipt.stud.dev.bucket.domain.Book;
import ipt.stud.dev.bucket.domain.Bucket;

public interface BucketService {

    Bucket getBucketByToken(String token);

    Bucket addBookToBucketByToken(String token, Book book);

    Bucket deleteBookFromBucketByToken(String token, Book book);

    void deleteBucketByToken(String token);

}
