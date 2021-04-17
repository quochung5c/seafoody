SELECT * FROM Product;
ALTER TABLE Product ADD pricePerRatio enum('kg','g','chiếc','con');
INSERT INTO Product (productName,price,productType,posted_at,company,description,promotion,pricePerRatio,productImg,employee) VALUES (
	'Cá thu Hạ Long',250.000,'Tuoi song',NOW(),1,'Ca thu rat ngon va tuoi song',3,1,2
);
update Product set pricePerRatio = 'kg' WHERE NOT id = 1;
update Product set price = 250000 WHERE id = 1;

SELECT * FROM Company;
INSERT INTO Product (productName,price,productType,posted_at,company,description,promotion) VALUES (
	'Mực ống Nha Trang',140.000,'Dong lanh',NOW(),3,'Mực tươi ngon được ướp lạnh có thể sử dụng sau nhiều ngày',1
);
INSERT INTO Product (productName,price,productType,posted_at,company,description,promotion) VALUES (
	'Cá thu một nắng Cần Thơ',250.000,'Do kho',NOW(),2,'Cá thu được phơi khô 30 ngày trước khi đóng gói',2
);

UPDATE Product set price = 140000 WHERE id = 2;
update Product set price = 250000 where id = 3;

UPDATE Product SET likes = 0;


SELECT Employee.*, company.companyName FROM Employee INNER JOIN Company ON employee.company = company.companyId WHERE user = 2;

INSERT INTO Product (productName,price,productType,posted_at,company,description,promotion,pricePerRatio,productImg,employee) VALUES ('Chả mực Hạ Long',40000,'Dong lanh',NOW(),3,'Chả mực tuyệt ngon, thật hấp dẫn','kg',3,3);

ALTER TABLE Product
DROP FOREIGN KEY new_product_image;

ALTER TABLE feedbackonproduct 
DROP FOREIGN KEY feedbackonproduct_ibfk_2;

ALTER TABLE product_hoadon 
DROP FOREIGN KEY product_hoadon_ibfk_2;

ALTER TABLE Product ADD COLUMN imageUrl varchar(255);

DROP TABLE product_image;
DROP TABLE productimage;

