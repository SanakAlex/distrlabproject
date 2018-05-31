package ipt.stud.dev.hazelcast.server;

import com.hazelcast.config.Config;
import com.hazelcast.config.JoinConfig;
import com.hazelcast.config.MapConfig;
import com.hazelcast.config.NetworkConfig;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;

public class HazelcastServer {

    public static void main(String[] args) {
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
                .addMember("hazelcast-server");
//                .addMember("hazelcast-server2")
//                .addMember("hazelcast-server3");

        MapConfig mapConfig = new MapConfig();
        mapConfig
                .setName("token_bucket_cache_map")
                .setBackupCount(0);
//                .setBackupCount(3);
        cfg.addMapConfig(mapConfig);

        HazelcastInstance instance = Hazelcast.newHazelcastInstance(cfg);
    }
}
