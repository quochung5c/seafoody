-- Edit productImages
DROP TABLE ProductImage;
CREATE TABLE ProductImage(
	imageId int primary key not null auto_increment,
    imageUrl varchar(255),
    imageDesc varchar(255),
    featureIn boolean,
    product int,
    foreign key (product) references Product(id)
);
    
