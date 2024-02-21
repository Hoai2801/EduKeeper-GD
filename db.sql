create database documentDB;
use documentDB;

create table department(
                           id int primary key auto_increment,
                           department_name varchar(200) not null
);

create table category(
                         id int primary key auto_increment,
                         category_name varchar(200) not null
);

create table users(
                      id int primary key auto_increment,
                      user_id int not null,
                      user_name varchar(200) not null,
                      department_id int not null,
                      password varchar(200) not null,
                      role varchar(50) not null,
                      foreign key (department_id) references department(id)
);

create table teacher(
                        id int primary key auto_increment,
                        teacher_name varchar(200) not null
);

create table subject(
                        id int primary key auto_increment,
                        subject_name varchar(50) not null
);

create table document(
                         id int primary key auto_increment,
                         user_id int not null,
                         document_name varchar(200) not null,
                         slug varchar(300) not null,
                         document_type varchar(200) not null,
                         document_size float not null,
                         upload_date date not null,
                         content text not null,
                         department_id int not null,
                         subject_name varchar(50) not null,
                         teacher_id int not null,
                         category_id int not null,
                         foreign key (department_id) references department(id),
                         foreign key (category_id) references category(id)
);

create table access(
                       id int primary key auto_increment,
                       user_id int not null,
                       document_id int not null,
                       foreign key (user_id) references users(id),
                       foreign key (document_id) references document(id)
);
