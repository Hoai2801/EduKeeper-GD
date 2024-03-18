create database documentDB;
use documentDB;

DROP TABLE IF EXISTS `department`;

-- dùng để lưu thông tin khoa của tài liệu (ví dụ: khoa công nghệ thông tin, khoa kinh tế, khoa marketing...)
CREATE TABLE `department` (
                              `id` smallint NOT NULL AUTO_INCREMENT,
                              `department_name` varchar(100) NOT NULL,
                              PRIMARY KEY (`id`),
                              KEY `idx_department_name` (`department_name`)
);

INSERT INTO `department` (`department_name`)
VALUES
	('Toàn khoa'),
    ('Công nghệ thông tin'),
    ('Kỹ thuật phần mềm'),
    ('Mạng máy tính và truyền thông dữ liệu'),
    ('Quản trị kinh doanh'),
    ('Marketing'),
    ('Tài chính ngân hàng'),
    ('Kinh doanh quốc tế'),
    ('Thương mại điện tử'),
    ('Quản trị khách sạn'),
    ('Logistics và Quản lý chuỗi cung ứng'),
    ('Quản trị dịch vụ du lịch và lữ hành'),
    ('Kế toán'),
    ('Luật'),
    ('Ngôn ngữ anh'),
    ('Đông phương học'),
    ('Truyền thông đa phương tiện'),
    ('Quan hệ công chúng');


DROP TABLE IF EXISTS `specialized`;

-- Chuyên ngành
CREATE TABLE `specialized` (
                               id smallint not null auto_increment,
                               `specialized_name` varchar(50) not null,
                               `department_id` smallint not null,
                               PRIMARY KEY (`id`),
                               KEY `department_id` (`department_id`),
                               CONSTRAINT `specialized_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
);

INSERT INTO `specialized` (`specialized_name`, `department_id`)
VALUES
	('Toàn ngành', 1),
    ('Khai thác dữ liệu lớn', '2'),
    ('Lập trình kết nối vạn vật_IOT', '2'),
    ('An toàn thông tin mạng', '2'),
    ('Đồ họa kỹ thuật số', '2'),
    ('Thiết kế vi mạch', '2'),
    ('Kỹ thuật phần mềm', '3'),
    ('Mạng máy tính và truyền thông dữ liệu', '4'),
    ('Quản trị nguồn nhân lực', '5'),
    ('Quản trị doanh nghiệp', '5'),
    ('Quản trị vận hành', '5'),
    ('Quản trị khởi nghiệp', '5'),
    ('Quản trị bán lẻ', '5'),
    ('Kinh doanh bất động sản', '5'),
    ('Quản trị dịch vụ hàng không', '5'),
    ('Marketing kỹ thuật số', '6'),
    ('Quản trị truyền thông và thương hiệu', '6'),
    ('Quản trị tài chính', '7'),
    ('Tín dụng ngân hàng', '7'),
    ('Tài chính và thanh toán quốc tế', '7'),
    ('Ngoại thương', '8'),
    ('Kinh doanh xuất nhập khẩu', '8'),
    ('Thương mại điện tử', '9'),
    ('Quản trị cơ sở lưu trú', '10'),
    ('Quản trị dịch vụ ăn uống', '10'),
    ('Logistics và Quản lý chuỗi cung ứng', '11'),
    ('Quản trị dịch vụ du lịch và lữ hành', '12'),
    ('Kế toán', '13'),
    ('Luật kinh doanh', '14'),
    ('Luật thương mại quốc tế', '14'),
    ('Tiếng Anh thương mại', '15'),
    ('Tiếng Anh biên phiên dịch', '15'),
    ('Tiếng Anh du lịch', '15'),
    ('Văn hóa và ngôn ngữ Nhật Bản', '16'),
    ('Văn hóa và ngôn ngữ Hàn Quốc', '16'),
    ('Văn hóa và ngôn ngữ Trung Quốc', '16'),
    ('Truyền thông giao tiếp', '17'),
    ('Truyền hình điện ảnh quảng cáo', '17'),
    ('Xây dụng - Quản trị kênh truyền thông độc lập', '17'),
    ('Quan hệ công chúng', '18');

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
                         `id` int NOT NULL AUTO_INCREMENT,
                         `username` varchar(200) NOT NULL,
                         `department_id` smallint NOT NULL,
                         `password` varchar(200) NOT NULL,
                         `role` varchar(50) NOT NULL,
                         PRIMARY KEY (`id`),
                         KEY `department_id` (`department_id`),
                         CONSTRAINT `users_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
);

INSERT INTO users(username, department_id, password, role) value('hoai', 1, 'password', 'ADMIN');

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
    ('Nghiên cứu khoa học'),
    ('Powerpoint'),
    ('Tài liệu giảng dạy');

DROP TABLE IF EXISTS `subject`;

-- lưu trữ tiểu luận của môn học 
CREATE TABLE `subject` (
                           `id` smallint NOT NULL AUTO_INCREMENT,
                           `subject_name` varchar(50) NOT NULL,
                           PRIMARY KEY (`id`),
                           KEY `idx_subject_name` (`subject_name`)
);

INSERT INTO subject(subject_name) values('Toan'), ('AV');

-- lưu trữ môn học nào thuộc khoa nào 
CREATE TABLE `subject_specialized` (
                                      `subject_id` smallint NOT NULL,
                                      `specialized_id` smallint NOT NULL,
                                      PRIMARY KEY (`subject_id`, `specialized_id`),
                                      FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`),
                                      FOREIGN KEY (`specialized_id`) REFERENCES `specialized` (`id`)
);

DROP TABLE IF EXISTS `document`;

-- dùng để lưu thông tin của tài liệu 
CREATE TABLE `document` (
                            `id` int NOT NULL AUTO_INCREMENT,
                            `user_id` int NOT NULL,
                            `title` varchar(200) NOT NULL,
                            `slug` varchar(300) NOT NULL,
                            `document_type` varchar(10) NOT NULL,
                            `document_size` smallint NOT NULL,
                            `upload_date` date NOT NULL,
							-- chứa đường dẫn đến nơi lưu file
                            `path` varchar(500) NOT NULL,
                            `department_id` smallint DEFAULT NULL,
                            `subject_id` smallint NOT NULL,
                            `category_id` tinyint DEFAULT NULL,
                            `teacher_id` int NOT NULL,
                            `download` int not null,
                            `views` int not null,
                            PRIMARY KEY (`id`),
                            KEY `document_ibfk_3` (`teacher_id`),
                            KEY `document_ibfk_4` (`subject_id`),
                            KEY `document_ibfk_1` (`department_id`),
                            KEY `document_ibfk_2` (`category_id`),
                            KEY `document_ibfk_5` (`user_id`),
                            CONSTRAINT `document_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`),
                            CONSTRAINT `document_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
                            CONSTRAINT `document_ibfk_3` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`),
                            CONSTRAINT `document_ibfk_4` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`),
                            CONSTRAINT `document_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
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
                       tokenType VARCHAR(50),
                       revoked BOOLEAN,
                       expired BOOLEAN,
                       user_id int,
                       FOREIGN KEY (user_id) REFERENCES users(id)
);




