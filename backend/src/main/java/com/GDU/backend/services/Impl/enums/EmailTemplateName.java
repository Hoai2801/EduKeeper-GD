package com.GDU.backend.services.Impl.enums;

import lombok.Getter;

@Getter
public enum EmailTemplateName {

    ACTIVATION("activation_account"),
    FORGOT_PASSWORD("forgot_password"),
    CHANGE_PASSWORD("change_password");

    private final String name;

    EmailTemplateName(String name) {
        this.name = name;
    }
}
