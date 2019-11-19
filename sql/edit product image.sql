-- Edit productImages
DROP TABLE Product_Image;
CREATE TABLE Product_Image(
	imageId int primary key not null auto_increment,
    imageUrl varchar(255),
    imageDesc varchar(255)
);

SELECT * FROM product_image;
ALTER TABLE Product ADD employee int;
ALTER TABLE product ADD constraint emp_handle foreign key (employee) references employee(empId);

ALTER TABLE Product ADD constraint new_product_image foreign key (productImg) references product_image(imageId);

SELECT * FROM Product;

INSERT product_image (imageUrl,imageDesc) VALUES ('dokho.com','Mực khô ngon lắm');
INSERT product_image (imageUrl,imageDesc) VALUES ('imageUrl.com.vn','Cá thu tuyệt vời');
INSERT product_image (imageUrl,imageDesc) VALUES ('cathu.com','Cá thu một nắng');

SELECT * FROM Employee;
UPDATE Product SET employee = 1 WHERE id = 2;
UPDATE Product SET employee = 2 WHERE id = 3;
UPDATE Product SET employee = 3 WHERE id = 1;

-- Lấy danh sách đầy đủ thông tin của tất cả sản phẩm
SELECT product.productName, product.id, product.price, product.productType, product.posted_at, product.description, product.pricePerRatio,
company.companyName, company.companyId,
promotion.promocode, promotion.promotionId, 
employee.firstName, employee.lastName FROM (((Product 
	INNER JOIN company ON product.id = company.companyId)
    INNER JOIN promotion ON product.promotion = promotion.promotionId)
    INNER JOIN employee ON product.employee = employee.empId);
      
SELECT product.productName, product.id, product.price, product.productType, product.posted_at, product.description, product.pricePerRatio,
company.companyName, company.companyId,
promotion.promocode, promotion.promotionId, 
employee.firstName, employee.lastName FROM (((Product 
	INNER JOIN company ON product.id = company.companyId)
    INNER JOIN promotion ON product.promotion = promotion.promotionId)     
    INNER JOIN employee ON product.employee = employee.empId) WHERE product.id = 1;
    
-- Tìm kiếm theo product Name
SELECT product.productName, product.id, product.price, product.productType, product.posted_at, product.description, product.pricePerRatio,
company.companyName, company.companyId,
promotion.promocode, promotion.promotionId, 
employee.firstName, employee.lastName FROM (((Product 
	INNER JOIN company ON product.id = company.companyId)
    INNER JOIN promotion ON product.promotion = promotion.promotionId)
    INNER JOIN employee ON product.employee = employee.empId) WHERE product.productName LIKE '%Tom%';
    
    
SELECT product.id, product.productName, product.price, product.productType, promotion.promoPercent, product.posted_at, product.description, product.pricePerRatio, company.companyName, product.company, promotion.promocode, employee.firstName, employee.lastName FROM (((Product 
	INNER JOIN Company ON product.company = company.companyId)
    INNER JOIN promotion ON product.promotion = promotion.promotionId)
    INNER JOIN employee ON product.employee = employee.empId);