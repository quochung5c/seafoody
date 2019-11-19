CREATE DATABASE Seafoody;

CREATE TABLE User (
	uid int auto_increment not null unique,
    nickname varchar(255),
    created_at timestamp,
    gender enum("Male","Female"),
    location varchar(255),
    phoneNumber varchar(255),
    email varchar(255),
    avatarUrl varchar(255),
    primary key (uid)
);

CREATE TABLE Company (
    companyId int auto_increment not null unique,
    companyName varchar(255),
    avatarUrl varchar(255),
	location varchar(255),
    description varchar(255),
    phoneNumber varchar(255),
    primary key (companyId)
);

CREATE TABLE Promotion (
	promotionId int auto_increment not null unique,
    promocode varchar(20),
    promoPercent smallint,
    exprireDate timestamp,
    promoDescription varchar(255),
    primary key (promotionId)
);

CREATE TABLE Product(
    id int auto_increment not null unique,
    productName varchar(255),
    price numeric(10,2),
    productType enum("Dong lanh","Tuoi song","Do kho"),
    posted_at timestamp,
    company int,
    description varchar(255),
    promotion int,
    primary key (id),
    foreign key (company) references Company(companyId),
    foreign key (promotion) references Promotion(promotionId)
);

DROP TABLE FeedbackOnProduct;
DROP TABLE feebackonsite;

CREATE TABLE FeedbackOnProduct(
    fopId int auto_increment not null unique,
    user int,
    product int,
    fopText varchar(255),
    likes int default 0,
    genre int,
    primary key (fopId),
	created_at timestamp,
    foreign key (user) references User(uid) on delete cascade,
    foreign key (product) references Product(id) on delete cascade,
    foreign key (genre) references FeedbackType(typeId) on delete set null
);

CREATE TABLE FeebackOnSite(
    fosId int auto_increment not null unique,
	genre int,
    user int,
    fosText varchar(255),
	created_at timestamp,
    primary key(fosId),
    foreign key (user) references User(uid) on delete cascade,
    foreign key (genre) references FeedbackType(typeId) on delete set null
);


-- Favorites for products
DROP TABLE Favorites;
CREATE TABLE Favorites (
    favorId int auto_increment not null unique,
    product int,
    customer int,
	primary key (favorId),
    foreign key (customer) references User(uid) on delete cascade,
    foreign key (product) references Product(id) on delete cascade
);

SELECT * FROM Product;
