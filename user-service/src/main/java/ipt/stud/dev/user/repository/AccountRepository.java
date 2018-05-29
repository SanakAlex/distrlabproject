package ipt.stud.dev.user.repository;

import ipt.stud.dev.user.domain.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends CrudRepository<Account, String> {

	Account findByLogin(String name);

	Account findByEmail(String email);
}
