package ipt.stud.dev.auth.service.security;

import ipt.stud.dev.auth.domain.User;
import ipt.stud.dev.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MongoUserDetailsService implements UserDetailsService {

    private final UserRepository repository;

    @Autowired
    public MongoUserDetailsService(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = repository.findOneByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException(email);
        }

        return user;
    }
}
