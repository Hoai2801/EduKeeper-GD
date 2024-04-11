create database documentDB;
use documentDB;

DROP TABLE IF EXISTS `department`;

-- dùng để lưu thông tin khoa của tài liệu (ví dụ: khoa công nghệ thông tin, khoa kinh tế, khoa marketing...)
CREATE TABLE `department` (
                              `id` smallint NOT NULL AUTO_INCREMENT,
                              `department_name` varchar(100) NOT NULL,
                              `department_slug` varchar(100) not null,
                              PRIMARY KEY (`id`),
                              KEY `idx_department_name` (`department_name`)
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
    ('Quan hệ công chúng', 'quan-he-cong-chung');



DROP TABLE IF EXISTS `specialized`;

-- Chuyên ngành
CREATE TABLE `specialized` (
                               id smallint not null auto_increment,
                               `specialized_name` varchar(50) not null,
                               `specialized_slug` varchar(100) not null,
                               `department_id` smallint not null,
                               PRIMARY KEY (`id`),
                               KEY `department_id` (`department_id`),
                               CONSTRAINT `specialized_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
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
('Quan hệ công chúng', 'quan-he-cong-chung', 17);


DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
                         `id` int NOT NULL AUTO_INCREMENT,
                         `user_name` varchar(200) NOT NULL,
--                          `department_id` smallint NOT NULL,
                         `password` varchar(200) NOT NULL,
                         `role_id` tinyint NOT NULL,
                         `account_locked` boolean not null default false,
                         `enable` boolean not null default false,
                         `email` varchar(50) not null,
                         `created_date` datetime not null,
                         `last_modified_date` datetime not null,
						`staff_code` varchar(20) not null,
                         PRIMARY KEY (`id`)
--                          KEY `department_id` (`department_id`),
--                          CONSTRAINT `users_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
);

-- INSERT INTO users(user_name, department_id, password, role) value('hoai', 1, 'password', 'ADMIN'); 

DROP TABLE IF EXISTS `category`;

-- dùng để phân loại tài liệu như là tiểu luận, sách, bài báo nghiên cứu khoa học, tài liệu tham khảo, giáo trình...
CREATE TABLE `category` (
                            `id` tinyint NOT NULL AUTO_INCREMENT,
                            `category_name` varchar(200) NOT NULL,
                            PRIMARY KEY (`id`),
                            KEY `idx_category_name` (`category_name`)
);

INSERT INTO `category` (`category_name`)
VALUES
    ('Sách'),
    ('Tiểu luận'),
    ('Nghiên cứu khoa học');

DROP TABLE IF EXISTS `document`;

-- dùng để lưu thông tin của tài liệu 
CREATE TABLE `document` (
                            `id` int NOT NULL AUTO_INCREMENT,
                            `title` varchar(200) NOT NULL,
                            `slug` varchar(300) NOT NULL,
                            `document_type` varchar(30) NOT NULL,
                            `document_size` smallint NOT NULL,
                            `pages` smallint not null,
                            `upload_date` date NOT NULL,
							-- chứa đường dẫn đến nơi lưu file
                            `path` varchar(500) NOT NULL,
                            `pages` smallint not null,
                            `specialized_id` smallint DEFAULT NULL,
                            `category_id` tinyint DEFAULT NULL,
                            `author_name` varchar(100) NOT NULL,
                            `download` int not null,
                            `views` int not null,
                            PRIMARY KEY (`id`),
                            KEY `document_ibfk_1` (`specialized_id`),
                            KEY `document_ibfk_2` (`category_id`),
                            CONSTRAINT `document_ibfk_1` FOREIGN KEY (`specialized_id`) REFERENCES `specialized` (`id`),
                            CONSTRAINT `document_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
);

DROP TABLE IF EXISTS `favorite`;

-- dùng để lưu thông tin các tài liệu mà người dùng ưu thích, muốn đọc lại, tham khảo nhiều lần
CREATE TABLE `favorite` (
                            `id` int NOT NULL AUTO_INCREMENT,
                            `user_id` int NOT NULL,
                            `document_id` int NOT NULL,
                            PRIMARY KEY (`id`),
                            KEY `user_id` (`user_id`),
                            KEY `document_id` (`document_id`),
                            CONSTRAINT `access_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
                            CONSTRAINT `access_ibfk_2` FOREIGN KEY (`document_id`) REFERENCES `document` (`id`)
);


CREATE TABLE token (
                       id int AUTO_INCREMENT PRIMARY KEY,
                       token VARCHAR(255) UNIQUE NOT NULL,
                       token_type VARCHAR(50),
                       revoked BOOLEAN,
                       expired BOOLEAN,
                       user_id int,
                       FOREIGN KEY (user_id) REFERENCES users(id)
);



