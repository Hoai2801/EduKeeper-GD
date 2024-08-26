create table banner
(
    id        int auto_increment
        primary key,
    image     varchar(200)         not null,
    idex      int                  null,
    url       varchar(500)         null,
    is_enable tinyint(1) default 1 null
);

create table category
(
    id            int auto_increment
        primary key,
    category_name varchar(50)  not null,
    category_slug varchar(100) not null
);

create index idx_category_name
    on category (category_name);

create table comment
(
    id          bigint auto_increment
        primary key,
    document_id bigint        null,
    user_id     bigint        null,
    content     varchar(5000) not null,
    parent_id   bigint        null,
    created_at  datetime      null
);

create table department
(
    id              int auto_increment
        primary key,
    department_name varchar(100)         not null,
    department_slug varchar(100)         not null,
    is_locked       tinyint(1) default 0 null
);

create table notification
(
    id          bigint auto_increment
        primary key,
    sender      bigint       null,
    receiver    bigint       null,
    title       varchar(255) null,
    content     varchar(255) null,
    is_check    bit          not null,
    document_id bigint       null,
    created_at  datetime     null
);

create table role
(
    id   tinyint auto_increment
        primary key,
    name varchar(100) not null
);

create table setting
(
    id    int auto_increment
        primary key,
    name  varchar(50) not null,
    value varchar(50) not null
);

create table specialized
(
    id               int auto_increment
        primary key,
    specialized_name varchar(50)          not null,
    specialized_slug varchar(100)         not null,
    department_id    int                  not null,
    is_locked        tinyint(1) default 0 null,
    constraint specialized_ibfk_1
        foreign key (department_id) references department (id)
);

create index department_id
    on specialized (department_id);

create table subject
(
    id           int auto_increment
        primary key,
    subject_name varchar(50) not null,
    subject_slug varchar(80) not null
);

create table subject_specialized
(
    id             int auto_increment
        primary key,
    subject_id     int not null,
    specialized_id int not null,
    constraint specialized_fk_sjsc
        foreign key (specialized_id) references specialized (id),
    constraint subject_fk_sjsc
        foreign key (subject_id) references subject (id)
);

create table users
(
    id                 int auto_increment
        primary key,
    user_name          varchar(200)         not null,
    password           varchar(200)         not null,
    role_id            tinyint              not null,
    account_locked     tinyint(1) default 0 not null,
    enable             tinyint(1) default 0 not null,
    email              varchar(50)          not null,
    department         int                  null,
    specialized        int                  null,
    date_of_birth      datetime             null,
    class              varchar(20)          null,
    created_date       datetime             null,
    avatar             varchar(200)         null,
    last_modified_date datetime             null,
    staff_code         varchar(20)          not null,
    constraint dpm_fk
        foreign key (department) references department (id),
    constraint role_fk
        foreign key (role_id) references role (id),
    constraint spec_fk
        foreign key (specialized) references specialized (id)
);

create table document
(
    id                 int auto_increment
        primary key,
    title              varchar(200)                                                not null,
    slug               varchar(300)                                                not null,
    document_type      varchar(30)                                                 not null,
    document_size      smallint                                                    not null,
    pages              smallint                                                    not null,
    upload_date        date                                                        not null,
    status             enum ('draft', 'published')                default 'draft'  not null,
    scope              enum ('public', 'student-only', 'private') default 'public' not null,
    path               varchar(500)                                                not null,
    description        varchar(2000)                                               not null,
    category_id        int                                                         null,
    subject_id         int                                                         null,
    thumbnail          varchar(200)                                                null,
    author             varchar(100)                                                not null,
    user_upload        int                                                         not null,
    is_delete          tinyint(1)                                 default 0        null,
    deleted_at         datetime                                                    null,
    specialized_id     int                                                         not null,
    path_download      varchar(500)                                                null,
    download_file_type varchar(500)                                                null,
    constraint document_ibfk_1
        foreign key (user_upload) references users (id),
    constraint document_ibfk_2
        foreign key (category_id) references category (id),
    constraint document_ibfk_3
        foreign key (subject_id) references subject (id),
    constraint document_specialized_id_fk
        foreign key (specialized_id) references specialized (id)
);

create index document_ibfk_4
    on document (author);

create fulltext index title_index
    on document (title);

create table downloads
(
    id          int auto_increment
        primary key,
    user_id     int not null,
    document_id int not null,
    constraint dl_ibfk_1
        foreign key (user_id) references users (id),
    constraint dl_ibfk_2
        foreign key (document_id) references document (id)
);

create index document_id
    on downloads (document_id);

create index user_id
    on downloads (user_id);

create table favorite
(
    id          int auto_increment
        primary key,
    user_id     int not null,
    document_id int not null,
    constraint access_ibfk_1
        foreign key (user_id) references users (id),
    constraint access_ibfk_2
        foreign key (document_id) references document (id)
);

create index document_id
    on favorite (document_id);

create index user_id
    on favorite (user_id);

create table token
(
    id           int auto_increment
        primary key,
    token        varchar(255) not null,
    user_id      int          null,
    created_date datetime     not null,
    expires_date datetime     not null,
    validated_at datetime     null,
    constraint token
        unique (token),
    constraint token_ibfk_1
        foreign key (user_id) references users (id)
);

create index user_id
    on token (user_id);

create index role_id
    on users (role_id);

create table view_history
(
    id          int auto_increment
        primary key,
    user_id     int                  not null,
    document_id int                  not null,
    created_at  datetime             not null,
    is_lastest  tinyint(1) default 1 not null,
    constraint vh_fk_d
        foreign key (document_id) references document (id),
    constraint vh_fk_u
        foreign key (user_id) references users (id)
);

	
