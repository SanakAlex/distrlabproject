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

//    @Bean
//    public ClientConfig clientConfig(DiscoveryServiceProvider discoveryServiceProvider) {
//        ClientConfig cfg = new ClientConfig();
//
//        ClientNetworkConfig network = cfg.getNetworkConfig();
//        network
//                .addAddress("hazelcast", "hazelcast:5701");
//        // Discovery
//        cfg.setProperty("hazelcast.discovery.enabled", Boolean.TRUE.toString());
//        cfg.getNetworkConfig().getDiscoveryConfig().setDiscoveryServiceProvider(discoveryServiceProvider);
//
//        return cfg;
//    }
//
//    @Configuration
//    @ConditionalOnMissingBean(HazelcastInstance.class)
//    static class HazelcastClientConfiguration {
//        @Bean
//        public HazelcastInstance hazelcastInstance(ClientConfig clientConfig) {
//            return HazelcastClient.newHazelcastClient(clientConfig);
//        }
//    }

    @Bean
    public HazelcastInstance hazelcastInstance() {
        ClientConfig cfg = new ClientConfig();

        ClientNetworkConfig network = cfg.getNetworkConfig();
        network
                .addAddress("hazelcast", "hazelcast:5701");
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
