SELECT * FROM Product;
ALTER TABLE Product ADD pricePerRatio enum('kg','g','chiếc','con');
INSERT INTO Product (productName,price,productType,posted_at,company,description,promotion,likes) VALUES (
	'Cá thu Hạ Long',250.000,'Tuoi song',NOW(),1,'Ca thu rat ngon va tuoi song',null,0
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

ALTER TABLE Product MODIFY COLUMN price numeric(19,0);
UPDATE Product set price = 140000 WHERE id = 2;
update Product set price = 250000 where id = 3;

UPDATE Product SET likes = 0;