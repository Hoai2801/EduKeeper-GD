package com.GDU.backend.dtos.responses;

public class UserRakingResI implements UserRakingRes {
    private final int total;
    private final UserRes user;

    public UserRakingResI(int total, Long id, String staffCode, String username, String email) {
        this.total = total;
        this.user = new UserRes(id, staffCode, username, email);
    }

    @Override
    public int getTotal() {
        return total;
    }

    @Override
    public UserRes getUser() {
        return user;
    }
}
