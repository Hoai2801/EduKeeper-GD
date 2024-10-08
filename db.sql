create database documentDB;
use documentDB;

DROP TABLE IF EXISTS `department`;

-- dùng để lưu thông tin khoa của tài liệu (ví dụ: khoa công nghệ thông tin, khoa kinh tế, khoa marketing...)
create table department
(
    id              int auto_increment
        primary key,
    department_name varchar(100)         not null,
    department_slug varchar(100)         not null,
    is_locked       tinyint(1) default 0 null
);

INSERT INTO `department` (`department_name`, `department_slug`)
VALUES
    ('Công nghệ thông tin', 'cong-nghe-thong-tin'),
    ('Kỹ thuật phần mềm', 'ky-thuat-phan-mem'),
    ('Mạng máy tính và truyền thông dữ liệu', 'mang-may-tinh-va-truyen-thong-du-lieu'),
    ('Quản trị kinh doanh', 'quan-tri-kinh-doanh'),
    ('Marketing', 'marketing'),
    ('Tài chính ngân hàng', 'tai-chinh-ngan-hang'),
    ('Kinh doanh quốc tế', 'kinh-doanh-quoc-te'),
    ('Thương mại điện tử', 'thuong-mai-dien-tu'),
    ('Quản trị khách sạn', 'quan-tri-khach-san'),
    ('Logistics và Quản lý chuỗi cung ứng', 'logistics-va-quan-ly-chuoi-cung-ung'),
    ('Quản trị dịch vụ du lịch và lữ hành', 'quan-tri-dich-vu-du-lich-va-lu-hanh'),
    ('Kế toán', 'ke-toan'),
    ('Luật', 'luat'),
    ('Ngôn ngữ anh', 'ngon-ngu-anh'),
    ('Đông phương học', 'dong-phuong-hoc'),
    ('Truyền thông đa phương tiện', 'truyen-thong-da-phuong-tien'),
    ('Quan hệ công chúng', 'quan-he-cong-chung'),
    ('Tất cả', 'tat-ca');


DROP TABLE IF EXISTS `specialized`;

-- Chuyên ngành
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

INSERT INTO `specialized` (`specialized_name`, `specialized_slug`, `department_id`)
VALUES
('Khai thác dữ liệu lớn', 'khai-thac-du-lieu-lon', 1),
('Lập trình kết nối vạn vật_IOT', 'lap-trinh-ket-noi-van-vat-iot', 1),
('An toàn thông tin mạng', 'an-toan-thong-tin-mang', 1),
('Đồ họa kỹ thuật số', 'do-hoa-ky-thuat-so', 1),
('Thiết kế vi mạch', 'thiet-ke-vi-mach', 1),
('Kỹ thuật phần mềm', 'ky-thuat-phan-mem', 2),
('Mạng máy tính và truyền thông dữ liệu', 'mang-may-tinh-va-truyen-thong-du-lieu', 3),
('Quản trị nguồn nhân lực', 'quan-tri-nguon-nhan-luc', 4),
('Quản trị doanh nghiệp', 'quan-tri-doanh-nghiep', 4),
('Quản trị vận hành', 'quan-tri-van-hanh', 4),
('Quản trị khởi nghiệp', 'quan-tri-khoi-nghiep', 4),
('Quản trị bán lẻ', 'quan-tri-ban-le', 4),
('Kinh doanh bất động sản', 'kinh-doanh-bat-dong-san', 4),
('Quản trị dịch vụ hàng không', 'quan-tri-dich-vu-hang-khong', 4),
('Marketing kỹ thuật số', 'marketing-ky-thuat-so', 5),
('Quản trị truyền thông và thương hiệu', 'quan-tri-truyen-thong-va-thuong-hieu', 5),
('Quản trị tài chính', 'quan-tri-tai-chinh', 6),
('Tín dụng ngân hàng', 'tin-dung-ngan-hang', 6),
('Tài chính và thanh toán quốc tế', 'tai-chinh-va-thanh-toan-quoc-te', 6),
('Ngoại thương', 'ngoai-thuong', 7),
('Kinh doanh xuất nhập khẩu', 'kinh-doanh-xuat-nhap-khau', 7),
('Thương mại điện tử', 'thuong-mai-dien-tu', 8),
('Quản trị cơ sở lưu trú', 'quan-tri-co-so-luu-tru', 9),
('Quản trị dịch vụ ăn uống', 'quan-tri-dich-vu-an-uong', 9),
('Logistics và Quản lý chuỗi cung ứng', 'logistics-va-quan-ly-chuoi-cung-ung', 10),
('Quản trị dịch vụ du lịch và lữ hành', 'quan-tri-dich-vu-du-lich-va-lu-hanh', 11),
('Kế toán', 'ke-toan', 12),
('Luật kinh doanh', 'luat-kinh-doanh', 13),
('Luật thương mại quốc tế', 'luat-thuong-mai-quoc-te', 13),
('Tiếng Anh thương mại', 'tieng-anh-thuong-mai', 14),
('Tiếng Anh biên phiên dịch', 'tieng-anh-bien-phien-dich', 14),
('Tiếng Anh du lịch', 'tieng-anh-du-lich', 14),
('Văn hóa và ngôn ngữ Nhật Bản', 'van-hoa-va-ngon-ngu-nhat-ban', 15),
('Văn hóa và ngôn ngữ Hàn Quốc', 'van-hoa-va-ngon-ngu-han-quoc', 15),
('Văn hóa và ngôn ngữ Trung Quốc', 'van-hoa-va-ngon-ngu-trung-quoc', 15),
('Truyền thông giao tiếp', 'truyen-thong-giao-tiep', 16),
('Truyền hình điện ảnh quảng cáo', 'truyen-hinh-dien-anh-quang-cao', 16),
('Xây dựng - Quản trị kênh truyền thông độc lập', 'xay-dung-quan-tri-kenh-truyen-thong-doc-lap', 16),
('Quan hệ công chúng', 'quan-he-cong-chung', 17),
('Tất cả', 'tat-ca', 18);

DROP TABLE IF EXISTS `subject`;

CREATE TABLE subject(
	`id` int primary key not null auto_increment,
    `subject_name` varchar(50) not null,
    `subject_slug` varchar(80) not null
);

CREATE TABLE `subject_specialized` (
	`id` int primary key not null auto_increment,
    `subject_id` int not null,
    `specialized_id` int not null,
                         CONSTRAINT `subject_fk_sjsc` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`),
                         CONSTRAINT `specialized_fk_sjsc` FOREIGN KEY (`specialized_id`) REFERENCES `specialized` (`id`)
);

create table `role` (
	`id` tinyint not null auto_increment primary key,
    `name` varchar(100) not null
);

insert into role(id, name) values (1, 'ROLE_ADMIN'), (2, 'ROLE_TEACHER'), (3, 'ROLE_USER');

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
                         `id` BIGINT NOT NULL AUTO_INCREMENT,
                         `user_name` varchar(200) NOT NULL,
                         `password` varchar(200) NOT NULL,
                         `role_id` tinyint NOT NULL,
                         `account_locked` boolean not null default false,
                         `enable` boolean not null default false,
                         `email` varchar(50) not null,
                         `department` int,
                         `specialized` int,
                         `date_of_birth` datetime,
                         `class` varchar(20),
                         `created_date` datetime,
                         `avatar` varchar(200),
                         `last_modified_date` datetime,
			 `staff_code` varchar(20) not null,
                         PRIMARY KEY (`id`),
                         KEY `role_id` (`role_id`),
                         CONSTRAINT `role_fk` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
                         CONSTRAINT `dpm_fk` FOREIGN KEY (`department`) REFERENCES `department` (`id`),
                         CONSTRAINT `spec_fk` FOREIGN KEY (`specialized`) REFERENCES `specialized` (`id`)
);


INSERT INTO users (id, user_name, password, role_id, account_locked, enable, email, department, specialized, date_of_birth, class, created_date, avatar, last_modified_date, staff_code) VALUES (1, 'Thac sĩ Hoài', '$2a$10$xXWuWl2TUQMeqyzOSn2fouG1yAUYxc7Zw2a1Lwx.w/bX0Gu6skSr2', 1, 0, 1, 'hackhoai@gmail.com', 1, 1, null, '123', '2024-07-04 15:18:50', null, '2024-08-22 13:26:01', '22140044');
INSERT INTO users (id, user_name, password, role_id, account_locked, enable, email, department, specialized, date_of_birth, class, created_date, avatar, last_modified_date, staff_code) VALUES (2, 'Thạc sĩ Nguyễn Văn A', '$2a$10$xXWuWl2TUQMeqyzOSn2fouG1yAUYxc7Zw2a1Lwx.w/bX0Gu6skSr2', 2, 0, 1, 'a@gmail.com', null, null, null, null, '2024-07-09 10:08:32', null, '2024-07-21 18:25:39', '22140033');
INSERT INTO users (id, user_name, password, role_id, account_locked, enable, email, department, specialized, date_of_birth, class, created_date, avatar, last_modified_date, staff_code) VALUES (23, 'user', '$2a$10$HBRRzBxDqoB2DDDGS72OFuPsb99nhXFxV6i4/mVxMZyUm.JR6nG92', 3, 0, 1, 'c@gmail.com', null, null, null, null, '2024-08-22 09:58:54', null, null, '22140066');



-- INSERT INTO users(user_name, department_id, password, role) value('hoai', 1, 'password', 'ADMIN'); 

DROP TABLE IF EXISTS `category`;

-- dùng để phân loại tài liệu như là tiểu luận, sách, bài báo nghiên cứu khoa học, tài liệu tham khảo, giáo trình...
CREATE TABLE `category` (
                            `id` int NOT NULL AUTO_INCREMENT,
                            `category_name` varchar(50) NOT NULL,
                            `category_slug` varchar(100) not null,
                            PRIMARY KEY (`id`),
                            KEY `idx_category_name` (`category_name`)
);

INSERT INTO `category` (`category_name`, `category_slug`)
VALUES
    ('Sách', 'sach'),
    ('Tiểu luận', 'tieu-luan'),
    ('Nghiên cứu khoa học', 'nghien-cuu-khoa-hoc'),
    ('Giáo trình', 'giao-trinh');

DROP TABLE IF EXISTS `document`;

CREATE TABLE document
(
    id             BIGINT AUTO_INCREMENT NOT NULL,
    title          VARCHAR(200)          NOT NULL,
    slug           VARCHAR(300)          NOT NULL,
    document_type  VARCHAR(30)        NOT NULL,
    document_size  BIGINT                NOT NULL,
    pages          INT                   NOT NULL,
    `description`  VARCHAR(255)          NULL,
    thumbnail      varchar(250)          NULL,
    upload_date    date                  NOT NULL,
    `file`           VARCHAR(500)        NOT NULL,
    is_delete      boolean               NOT NULL,
    category_id    int               	 NULL,
    user_upload    BIGINT                NOT NULL,
    author         VARCHAR(255)          NULL,
    deleted_at     datetime              NULL,
    scope          VARCHAR(255)          NULL,
    status         VARCHAR(255)          NULL,
    subject_id     int                NULL,
    specialized_id int                NULL,
    CONSTRAINT pk_document PRIMARY KEY (id)
);

ALTER TABLE document
    ADD CONSTRAINT FK_DOCUMENT_ON_CATEGORY FOREIGN KEY (category_id) REFERENCES category (id);

ALTER TABLE document
    ADD CONSTRAINT FK_DOCUMENT_ON_SPECIALIZED FOREIGN KEY (specialized_id) REFERENCES specialized (id);

ALTER TABLE document
    ADD CONSTRAINT FK_DOCUMENT_ON_SUBJECT FOREIGN KEY (subject_id) REFERENCES subject (id);

ALTER TABLE document
    ADD CONSTRAINT FK_DOCUMENT_ON_USER_UPLOAD FOREIGN KEY (user_upload) REFERENCES users (id);

DROP TABLE IF EXISTS `favorite`;

-- dùng để lưu thông tin các tài liệu mà người dùng ưu thích, muốn đọc lại, tham khảo nhiều lần
CREATE TABLE `favorite` (
                            `id` int NOT NULL AUTO_INCREMENT,
                            `user_id` BIGINT NOT NULL,
                            `document_id` BIGINT NOT NULL,
                            PRIMARY KEY (`id`),
                            KEY `user_id` (`user_id`),
                            KEY `document_id` (`document_id`),
                            CONSTRAINT `access_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
                            CONSTRAINT `access_ibfk_2` FOREIGN KEY (`document_id`) REFERENCES `document` (`id`)
);


CREATE TABLE token (
                       id int AUTO_INCREMENT PRIMARY KEY,
                       token VARCHAR(255) UNIQUE NOT NULL,
                       user_id bigint,
                       created_date datetime not null,
                       expires_date datetime not null,
                       validated_at datetime,
                       FOREIGN KEY (user_id) REFERENCES users(id)
);

create table view_history (
	id int auto_increment primary key,
	user_id BIGINT not null,
	document_id BIGINT not null,
    created_at datetime not null,
    is_lastest boolean default true not null,
	constraint `vh_fk_u` FOREIGN key (`user_id`) REFERENCES `users` (`id`),
	CONSTRAINT `vh_fk_do` FOREIGN KEY (`document_id`) REFERENCES `document` (`id`)
);

CREATE TABLE `downloads` (
                            `id` int NOT NULL AUTO_INCREMENT,
                            `user_id` BIGINT NOT NULL,
                            `document_id` BIGINT NOT NULL,
                            PRIMARY KEY (`id`),
                            KEY `user_id` (`user_id`),
                            KEY `document_id` (`document_id`),
                            CONSTRAINT `dl_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
                            CONSTRAINT `dl_ibfk_2` FOREIGN KEY (`document_id`) REFERENCES `document` (`id`)
);

CREATE TABLE notification
(
    id            BIGINT AUTO_INCREMENT NOT NULL,
    sender        BIGINT                NULL,
    receiver      BIGINT                NULL,
    title         VARCHAR(255)          NULL,
    content       VARCHAR(255)          NULL,
    is_check      BIT(1)                NOT NULL,
    document_slug BIGINT                NULL,
    created_at    datetime              NULL,
    CONSTRAINT pk_notification PRIMARY KEY (id)
);

ALTER TABLE notification
    ADD CONSTRAINT FK_NOTIFICATION_ON_DOCUMENT_SLUG FOREIGN KEY (document_slug) REFERENCES document (id);

ALTER TABLE notification
    ADD CONSTRAINT FK_NOTIFICATION_ON_RECEIVER FOREIGN KEY (receiver) REFERENCES users (id);

ALTER TABLE notification
    ADD CONSTRAINT FK_NOTIFICATION_ON_SENDER FOREIGN KEY (sender) REFERENCES users (id);

create table banner(
	id int not null auto_increment primary key,
    image varchar(200) not null,
    idex int,
    url varchar(500),
    is_enable boolean default true
);

create table comment
(
    id          bigint auto_increment
        primary key,
    document_id bigint        null,
    user_id     bigint        null,
    content     varchar(5000) not null,
    parent_id   bigint        null,
    created_at  datetime      null,
    constraint cmt_fk_dcm
        foreign key (document_id) references document (id),
    constraint cmt_fk_user
        foreign key (user_id) references users (id)
);

create table setting(
	id int not null auto_increment primary key,
	name varchar(50) not null,
    value varchar(50) not null
);
INSERT INTO documentDB.setting (id, name, value) VALUES (1, 'Tự động duyệt tài liệu mới', 'true');
INSERT INTO documentDB.setting (id, name, value) VALUES (2, 'Tự động duyệt tài liệu sửa đổi', 'true');


-- Performance
-- create index idx_slug on document (slug);
-- create index idx_download on document (download);
-- create index idx_views on document (views);
-- create index idx_upload_date on document (upload_date);
-- create index idx_department_slug on department (department_slug);
-- create index idx_specialized_slug on specialized (specialized_slug);
-- create index idx_category_name on category (category_name);
ALTER TABLE `document` ADD FULLTEXT INDEX `title_index` (`title`);
