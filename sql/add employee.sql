DROP TABLE Employee;
CREATE TABLE Employee (
	empId int auto_increment not null unique,
    firstName varchar(255) not null,
    lastName varchar(255) not null,
    workingStatus enum('Online','Offline'),
    user int,
    company int,
    position int,
    created_at timestamp default now(),
    constraint handle_emp 
		primary key (empId),
        foreign key (user) references User(uid) on delete cascade ,
        foreign key (position) references VaiTro(posId) on delete cascade,
        foreign key (company) references Company(companyId) on delete cascade
);
INSERT INTO Employee (firstName,lastName,workingStatus,user,company,position) VALUES ('Nguyễn','Hùng','Offline',1,1,1);
INSERT INTO Employee (firstName,lastName,workingStatus,user,company,position) VALUES ('Nguyễn','Long','Online',3,2,2);
INSERT INTO Employee (firstName,lastName,workingStatus,user,company,position) VALUES ('Nguyễn','Hùng','Offline',2,3,1);

SELECT * FROM Employee;

ALTER TABLE Employee DROP COLUMN position;

ALTER TABLE Employee ADD foreign key (company) references Company(companyId);

CREATE TABLE VaiTro (
	posId int auto_increment not null,
    positionName varchar(100),
    positionDesc varchar(255),
    primary key (posId)
);
INSERT INTO VaiTro (positionName,positionDesc) VALUES ('Nhân viên','Kiểm tra đơn hàng của khách hàng, trả lời thắc mắc');
INSERT INTO VaiTro (positionName,positionDesc) VALUES ('Quản lý','Duyệt đơn hàng, quản lý sản phẩm, thêm, sửa, xóa');

SELECT * FROM VaiTro;

DROP TABLE Position;

