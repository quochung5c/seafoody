<<<<<<< HEAD
DROP TABLE employee;
=======
DROP TABLE Employee;
>>>>>>> 8ec01ba8d602ed0b380dc4ff1e076f40026d3822
CREATE TABLE Employee (
	empId int auto_increment not null unique,
    firstName varchar(255) not null,
    lastName varchar(255) not null,
    workingStatus enum('Online','Offline'),
    user int,
    company int,
    position enum('Nhân viên','Quản lý'),
    created_at timestamp default now(),
    primary key (empId),
    foreign key (user) references User(uid),
    foreign key (company) references Company(companyId)
);
INSERT INTO Employee (firstName,lastName,workingStatus,user,company,position) VALUES ('Nguyễn','Hùng','Offline',1,1,'Nhân viên');
INSERT INTO Employee (firstName,lastName,workingStatus,user,company,position) VALUES ('Nguyễn','Long','Online',3,2,'Quản lý');
INSERT INTO Employee (firstName,lastName,workingStatus,user,company,position) VALUES ('Nguyễn','Hùng','Offline',2,3,'Nhân viên');

SELECT * FROM Employee;