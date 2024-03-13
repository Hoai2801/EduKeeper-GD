create database documentDB;
use documentDB;

DROP TABLE IF EXISTS `department`;

-- dùng để lưu thông tin khoa của tài liệu (ví dụ: khoa công nghệ thông tin, khoa kinh tế, khoa marketing...)
CREATE TABLE `department` (
                              `id` tinyint NOT NULL AUTO_INCREMENT,
                              `department_name` varchar(200) NOT NULL,
                              PRIMARY KEY (`id`),
                              KEY `idx_department_name` (`department_name`)
);
 
INSERT INTO `department` (`department_name`)
VALUES
  ('Công nghệ thông tin'),
  ('Kỹ thuật phần mềm'),
  ('Mạng máy tính và truyền thông dữ liệu'),
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

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
                         `id` int NOT NULL AUTO_INCREMENT,
                         -- `user_id` int NOT NULL,
                         `user_name` varchar(200) NOT NULL,
                         `department_id` tinyint NOT NULL,
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
  ('Nghiên cứu khoa học'),
  ('Powerpoint'),
  ('Tài liệu giảng dạy');

DROP TABLE IF EXISTS `subject`;

-- lưu trữ tiểu luận của môn học 
CREATE TABLE `subject` (
                           `id` tinyint NOT NULL AUTO_INCREMENT,
                           `subject_name` varchar(50) NOT NULL,
                           PRIMARY KEY (`id`),
                           KEY `idx_subject_name` (`subject_name`)
);

INSERT INTO subject(subject_name) values('Toan'), ('AV');

-- lưu trữ môn học nào thuộc khoa nào 
CREATE TABLE `subject_department` (
    `subject_id` tinyint NOT NULL,
    `department_id` tinyint NOT NULL,
    PRIMARY KEY (`subject_id`, `department_id`),
    FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`),
    FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
);

DROP TABLE IF EXISTS `document`;


-- dùng để lưu thông tin của tài liệu 
CREATE TABLE `document` (
                            `id` int NOT NULL AUTO_INCREMENT,
                            `user_id` int NOT NULL,
                            `title` varchar(200) NOT NULL,
                            `slug` varchar(300) NOT NULL,
                            `document_type` varchar(200) NOT NULL,
                            `document_size` float NOT NULL,
                            `upload_date` date NOT NULL,
                            -- chứa đường dẫn đến nơi lưu file
                            `path` text NOT NULL,
                            -- dùng tinyint vì số lượng khoa, môn học khó mà qua được con số 127 
                            `department_id` tinyint DEFAULT NULL,
                            `subject_id` tinyint NOT NULL,
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








-- DROP TABLE IF EXISTS `teacher`;

-- CREATE TABLE `teacher` (
--                           `id` int NOT NULL AUTO_INCREMENT,
--                           `teacher_name` varchar(200) NOT NULL,
--                           `department` tinyint NOT NULL,
--                           PRIMARY KEY (`id`),
--                           KEY `idx_teacher_name` (`teacher_name`)
-- ) 



