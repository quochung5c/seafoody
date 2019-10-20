-- Edit productImages
CREATE TABLE ProductImage(
	imageId int primary key not null auto_increment,
    imageUrl varchar(255),
    imageDesc varchar(255),
    featureIn boolean
);
    
ALTER TABLE productimage ADD product int unique;
ALTER TABLE productimage ADD foreign key (product) references Product(id);

