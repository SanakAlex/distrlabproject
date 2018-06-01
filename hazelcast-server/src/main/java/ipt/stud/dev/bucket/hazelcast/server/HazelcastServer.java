package ipt.stud.dev.bucket.hazelcast.server;

import com.hazelcast.config.Config;
import com.hazelcast.config.JoinConfig;
import com.hazelcast.config.MapConfig;
import com.hazelcast.config.NetworkConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@EnableDiscoveryClient
@Configuration
public class HazelcastServer {

    public static void main(String[] args) {
        SpringApplication.run(HazelcastServer.class, args);
    }

    @Bean
    public Config config() {
        Config cfg = new Config();

        NetworkConfig network = cfg.getNetworkConfig();
        network.setPort(5701).setPortAutoIncrement(false);

        JoinConfig join = network.getJoin();
        join
                .getMulticastConfig()
                .setEnabled(false);
        join
                .getTcpIpConfig()
                .setEnabled(true)
//                .addMember("localhost");
                .addMember("hazelcast");
//                .addMember("hazelcast-server2")
//                .addMember("hazelcast-server3");

        MapConfig mapConfig = new MapConfig();
        mapConfig
                .setName("token_bucket_cache_map")
                .setBackupCount(1);
//                .setBackupCount(3);
        cfg.addMapConfig(mapConfig);
        return cfg; // Set up any non-default config here
    }
}
