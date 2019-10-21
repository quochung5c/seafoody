CREATE TABLE Employee (
	empId int auto_increment not null unique,
    firstName varchar(255) not null,
    lastName varchar(255) not null,
    workingStatus enum('Online','Offline'),
    user int,
    company int,
    position enum('Nhân viên','Quản lý'),
    created_at timestamp default now()
);
INSERT INTO Employee (firstName,lastName,workingStatus,user,company,position) VALUES ('Nguyễn','Hùng','Offline',1,1,'Nhân viên');
INSERT INTO Employee (firstName,lastName,workingStatus,user,company,position) VALUES ('Nguyễn','Long','Online',3,2,'Quản lý');
INSERT INTO Employee (firstName,lastName,workingStatus,user,company,position) VALUES ('Nguyễn','Hùng','Offline',2,3,'Nhân viên');

SELECT * FROM Employee;