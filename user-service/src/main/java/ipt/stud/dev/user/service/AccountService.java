package ipt.stud.dev.user.service;

import ipt.stud.dev.user.domain.Account;
import ipt.stud.dev.user.domain.User;

public interface AccountService {

    /**
     * Finds account by given name
     *
     * @param accountName
     * @return found account
     */
    Account findByName(String accountName);

    /**
     * Checks if account with the same name already exists
     * Invokes Auth Service user creation
     * Creates new account with default parameters
     *
     * @param account
     * @return created account
     */
    Account create(Account account);

    /**
     * Validates and applies incoming account updates
     * Invokes Statistics Service update
     *
     * @param name
     * @param update
     */
    void saveChanges(String name, Account update);

}
