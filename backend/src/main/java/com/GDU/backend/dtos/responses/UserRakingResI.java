package com.GDU.backend.dtos.responses;

public class UserRakingResI implements UserRakingRes {
    private final int totalDownloads;
    private final int totalViews;
    private final UserRes user;

    public UserRakingResI(int totalDownloads, int totalViews, Long id, String staffCode, String username, String email,
            String klass,
            String department) {
        this.totalViews = totalViews;
        this.totalDownloads = totalDownloads;
        this.user = new UserRes(id, staffCode, username, email, klass, department);
    }

    @Override
    public int getTotalDownloads() {
        return totalDownloads;
    }

    @Override
    public UserRes getUser() {
        return user;
    }

    @Override
    public int getTotalViews() {
        return totalViews;
    }
}
