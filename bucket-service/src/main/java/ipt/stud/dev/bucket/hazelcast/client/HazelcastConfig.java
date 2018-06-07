package ipt.stud.dev.bucket.hazelcast.client;

import com.hazelcast.client.HazelcastClient;
import com.hazelcast.client.config.ClientConfig;
import com.hazelcast.client.config.ClientNetworkConfig;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.spi.discovery.integration.DiscoveryServiceProvider;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class HazelcastConfig {


    @Bean
    public HazelcastInstance hazelcastInstance() {
        ClientConfig cfg = new ClientConfig();

        ClientNetworkConfig network = cfg.getNetworkConfig();
        network
                .addAddress("localhost", "hazelcast-cache", "hazelcast-cache:5701", "localhost:8701");

//                .addAddress("hazelcast", "hazelcast:5701");
//                .addAddress("hazelcast-server", "hazelcast-server:5701");
//                .addAddress("hazelcast-server2", "hazelcast-server2:5701")
//                .addAddress("hazelcast-server3", "hazelcast-server3:5701");


        return HazelcastClient.newHazelcastClient(cfg);
    }

    @Bean
    public HazelcastClientTemplate hazelcastClientTemplate() {
        return new HazelcastClientTemplate(hazelcastInstance());
    }

}
