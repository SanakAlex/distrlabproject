package ipt.stud.dev.user.domain;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

public class User {

    @NotNull
    @Length(min = 3, max = 20)
    private String login;

    @NotNull
    @Length(min = 6, max = 40)
    private String password;

    public String getUsername() {
        return login;
    }

    public void setUsername(String username) {
        this.login = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
