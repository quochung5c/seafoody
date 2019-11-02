CREATE TABLE OrderStatus(
	statusCode int not null unique,
    statusText varchar(255),
    statusColor varchar(10),
    statusDesc varchar(255),
    primary key (statusCode)
);

CREATE TABLE HoaDon (
	id int not null auto_increment unique,
    customer int,
    created_date date,
    shipping_time timestamp,
    shipping_address varchar(255),
    payment_method enum("Credit Card","COD"),
    statusCode int,
    comments varchar(255),
    sumPrice numeric(19,0),
    primary key (id),
    foreign key (customer) references User(uid),
    foreign key (statusCode) references OrderStatus(statusCode)
);

CREATE TABLE Product_HoaDon(
	id int not null auto_increment unique,
    HoaDon int,
    product int,
    qty int,
    price numeric(19,0),
    primary key (id),
    foreign key (HoaDon) references HoaDon(id),
    foreign key (product) references Product(id)
);

DROP TABLE Payment;
CREATE TABLE Payment(
	creditNum varchar(255) unique not null,
    user int,
    expireDate date,
    amount numeric(19,0),
    foreign key (user) references User(uid)
);
ALTER TABLE hoadon ADD creditCard varchar(255);
ALTER TABLE hoadon ADD constraint handle_creditCard
	foreign key (creditCard) references Payment(creditNum); 
SELECT * FROM hoadon;
