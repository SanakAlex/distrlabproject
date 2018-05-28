package ipt.stud.dev.user.service;

import ipt.stud.dev.user.client.AuthServiceClient;
import ipt.stud.dev.user.domain.Account;
import ipt.stud.dev.user.domain.User;
import ipt.stud.dev.user.repository.AccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@Service
public class AccountServiceImpl implements AccountService {

	private final Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private AuthServiceClient authClient;

	@Autowired
	private AccountRepository repository;

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Account findByName(String accountName) {
		Assert.hasLength(accountName);
		return repository.findByLogin(accountName);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Account create(Account account) {

		Account existing = repository.findByLogin(account.getLogin());
		Assert.isNull(existing, "account already exists: " + account.getLogin());

		existing = repository.findByEmail(account.getEmail());
		Assert.isNull(existing, "account already exists: " + account.getEmail());

		User user = new User();
		user.setUsername(account.getLogin());
		user.setPassword(account.getPassword());

		authClient.createUser(user);

		repository.save(account);

		log.info("new account has been created: " + account.getLogin());

		return account;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void saveChanges(String login, Account update) {

		Account account = repository.findByLogin(login);
		Assert.notNull(account, "can't find account with login " + login);

		account.setEmail(update.getEmail());
		account.setLogin(update.getLogin());
		repository.save(account);

		log.debug("account {} changes has been saved", login);
	}
}
