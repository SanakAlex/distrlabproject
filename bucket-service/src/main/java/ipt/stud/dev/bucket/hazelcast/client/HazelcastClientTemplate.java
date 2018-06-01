package ipt.stud.dev.bucket.hazelcast.client;

import com.hazelcast.core.HazelcastInstance;
import ipt.stud.dev.bucket.domain.Bucket;

public class HazelcastClientTemplate {

    private HazelcastInstance hazelcastInstance;

    public HazelcastClientTemplate(HazelcastInstance hazelcastInstance) {
        this.hazelcastInstance = hazelcastInstance;
    }

    private static final String TOKEN_BUCKET_CACHE_MAP = "token_bucket_cache_map";

    public Bucket getBucketFromCacheByToken(String token) {
        return hazelcastInstance.<String, Bucket>getMap(TOKEN_BUCKET_CACHE_MAP).get(token);
    }

    public boolean getContainsBucketInCacheByToken(String token) {
        return hazelcastInstance.<String, Bucket>getMap(TOKEN_BUCKET_CACHE_MAP).containsKey(token);
    }


    public Bucket putBucketToCacheByToken(String token, Bucket bucket) {
        return hazelcastInstance.<String, Bucket>getMap(TOKEN_BUCKET_CACHE_MAP).put(token, bucket);
    }

    public void deleteBucketFromCacheByToken(String token) {
        hazelcastInstance.<String, Bucket>getMap(TOKEN_BUCKET_CACHE_MAP).remove(token);
    }

}
