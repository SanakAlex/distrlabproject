package ipt.stud.dev.bucket.service;

import com.hazelcast.client.HazelcastClient;
import ipt.stud.dev.bucket.domain.Book;
import ipt.stud.dev.bucket.domain.Bucket;
import ipt.stud.dev.bucket.hazelcast.client.HazelcastClientTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BucketServiceImpl implements BucketService {

    private HazelcastClientTemplate hazelcastClient;

    @Autowired
    BucketServiceImpl(HazelcastClientTemplate hazelcastClient) {
        this.hazelcastClient = hazelcastClient;
    }

    @Override
    public Bucket getBucketByToken(String token) {
        if (token == null)
            return null;
        if (hazelcastClient.getContainsBucketInCacheByToken(token))
            return hazelcastClient.getBucketFromCacheByToken(token);
        else {
            Bucket bucket = new Bucket();
            bucket = hazelcastClient.putBucketToCacheByToken(token, bucket);
            return bucket;
        }
    }

    @Override
    public Bucket addBookToBucketByToken(String token, Book book) {
        Bucket bucket = getBucketByToken(token);
        bucket.getBooks().put(book.getId(), book);
        return bucket;
    }

    @Override
    public Bucket deleteBookFromBucketByToken(String token, Book book) {
        Bucket bucket = getBucketByToken(token);
        bucket.getBooks().remove(book.getId());
        return bucket;
    }

    @Override
    public void deleteBucketByToken(String token) {
        if (hazelcastClient.getContainsBucketInCacheByToken(token))
            hazelcastClient.deleteBucketFromCacheByToken(token);
    }
}
