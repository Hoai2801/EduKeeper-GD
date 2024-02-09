use documentDB;
create database documentDB;
create table document(
	id int primary key auto_increment,
    user_id int not null,
    document_name text(200) not null,
    slug text(300) not null,
    department_id int not null,
    subject_name text(50) not null,
    teacher_id int not null
);