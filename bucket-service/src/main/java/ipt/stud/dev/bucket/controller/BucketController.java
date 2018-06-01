package ipt.stud.dev.bucket.controller;

import ipt.stud.dev.bucket.domain.Book;
import ipt.stud.dev.bucket.domain.Bucket;
import ipt.stud.dev.bucket.service.BucketService;
import ipt.stud.dev.bucket.util.CustomTokenExtractor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
public class BucketController {

    private final BucketService bucketService;

    @Autowired
    public BucketController(BucketService bucketService) {
        this.bucketService = bucketService;
    }

    @RequestMapping(path = "/", method = RequestMethod.GET)
    public Bucket getBucket(HttpServletRequest request) {
        String token = CustomTokenExtractor.extractHeaderToken(request);
        return bucketService.getBucketByToken(token);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/", method = RequestMethod.DELETE)
    public void deleteBucket(HttpServletRequest request) {
        String token = CustomTokenExtractor.extractHeaderToken(request);
        bucketService.deleteBucketByToken(token);
    }

    @RequestMapping(path = "/book", method = RequestMethod.POST)
    public Bucket addBookToBucket(HttpServletRequest request, @RequestBody Book book) {
        String token = CustomTokenExtractor.extractHeaderToken(request);
        return bucketService.addBookToBucketByToken(token, book);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/book", method = RequestMethod.DELETE)
    public Bucket deleteBookFromBucket(HttpServletRequest request, @RequestBody Book book) {
        String token = CustomTokenExtractor.extractHeaderToken(request);
        return bucketService.deleteBookFromBucketByToken(token, book);
    }
}
