package ipt.stud.dev.bucket.client;

import com.hazelcast.client.HazelcastClient;
import com.hazelcast.client.config.ClientConfig;
import com.hazelcast.client.config.ClientNetworkConfig;
import com.hazelcast.core.HazelcastInstance;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class HazelcastConfig {

    @Bean
    public HazelcastInstance hazelcastInstance() {
        ClientConfig cfg = new ClientConfig();

        ClientNetworkConfig network = cfg.getNetworkConfig();
        network
                .addAddress("hazelcast-server", "hazelcast-server:5701");
//                .addAddress("hazelcast-server2", "hazelcast-server2:5701")
//                .addAddress("hazelcast-server3", "hazelcast-server3:5701");


        return HazelcastClient.newHazelcastClient(cfg);
    }

    @Bean
    public HazelcastClientTemplate hazelcastClientTemplate() {
        return new HazelcastClientTemplate(hazelcastInstance());
    }

}
