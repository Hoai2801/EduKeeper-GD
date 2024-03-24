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

insert into `specialized` (`specialized_name`, `department_id`)
values
    ('Khai thác dữ liệu lớn', '1'),
    ('Lập trình kết nối vạn vật_IOT', '1'),
    ('An toàn thông tin mạng', '1'),
    ('Đồ họa kỹ thuật số', '1'),
    ('Thiết kế vi mạch', '1'),
    ('Kỹ thuật phần mềm', '2'),
    ('Mạng máy tính và truyền thông dữ liệu', '3'),
    ('Quản trị nguồn nhân lực', '4'),
    ('Quản trị doanh nghiệp', '4'),
    ('Quản trị vận hành', '4'),
    ('Quản trị khởi nghiệp', '4'),
    ('Quản trị bán lẻ', '4'),
    ('Kinh doanh bất động sản', '4'),
    ('Quản trị dịch vụ hàng không', '4'),
    ('Marketing kỹ thuật số', '5'),
    ('Quản trị truyền thông và thương hiệu', '5'),
    ('Quản trị tài chính', '6'),
    ('Tín dụng ngân hàng', '6'),
    ('Tài chính và thanh toán quốc tế', '6'),
    ('Ngoại thương', '7'),
    ('Kinh doanh xuất nhập khẩu', '7'),
    ('Thương mại điện tử', '8'),
    ('Quản trị cơ sở lưu trú', '9'),
    ('Quản trị dịch vụ ăn uống', '9'),
    ('Logistics và Quản lý chuỗi cung ứng', '10'),
    ('Quản trị dịch vụ du lịch và lữ hành', '11'),
    ('Kế toán', '12'),
    ('Luật kinh doanh', '13'),
    ('Luật thương mại quốc tế', '13'),
    ('Tiếng Anh thương mại', '14'),
    ('Tiếng Anh biên phiên dịch', '14'),
    ('Tiếng Anh du lịch', '14'),
    ('Văn hóa và ngôn ngữ Nhật Bản', '15'),
    ('Văn hóa và ngôn ngữ Hàn Quốc', '15'),
    ('Văn hóa và ngôn ngữ Trung Quốc', '15'),
    ('Truyền thông giao tiếp', '16'),
    ('Truyền hình điện ảnh quảng cáo', '16'),
    ('Xây dụng - Quản trị kênh truyền thông độc lập', '16'),
    ('Quan hệ công chúng', '17');

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
                         `id` int NOT NULL AUTO_INCREMENT,
                         `user_name` varchar(200) NOT NULL,
                         `department_id` smallint NOT NULL,
                         `password` varchar(200) NOT NULL,
                         `role` varchar(50) NOT NULL,
                         PRIMARY KEY (`id`),
                         KEY `department_id` (`department_id`),
                         CONSTRAINT `users_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
);

INSERT INTO users(user_name, department_id, password, role) value('hoai', 1, 'password', 'ADMIN');

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
                            `upload_date` date NOT NULL,
							-- chứa đường dẫn đến nơi lưu file
                            `path` varchar(500) NOT NULL,
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
                       tokenType VARCHAR(50),
                       revoked BOOLEAN,
                       expired BOOLEAN,
                       user_id int,
                       FOREIGN KEY (user_id) REFERENCES users(id)
);




