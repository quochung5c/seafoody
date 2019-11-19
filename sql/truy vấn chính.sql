-- Lay tong thong tin tat ca san pham.
SELECT * FROM product;
SELECT 
product.*, promotion.promotionId, company.companyName
FROM ((Product
INNER JOIN Company
ON product.company = company.companyId)
INNER JOIN promotion
ON product.promotion = promotion.promotionId);

-- Lay tong hong tin feedback tren cac san pham
SELECT 
	feedbackonproduct.fopId, feedbackonproduct.fopText, feedbackonproduct.likes, feedbackonproduct.created_at,product.productName, 
	user.nickname, user.avatarUrl 
 FROM ((feedbackonproduct
	INNER JOIN Product ON feedbackonproduct.product = product.id)
	INNER JOIN User ON feedbackonproduct.user = user.uid);
    
-- Lay thong tin feedback tren 1 san pham
SELECT 
	feedbackonproduct.fopId, feedbackonproduct.fopText, feedbackonproduct.likes, feedbackonproduct.created_at,product.productName, 
	user.nickname, user.avatarUrl 
 FROM ((feedbackonproduct
	INNER JOIN Product ON feedbackonproduct.product = product.id)
	INNER JOIN User ON feedbackonproduct.user = user.uid) 
WHERE product.id = 1;

-- Lấy sản phẩm của các công ty
SELECT company.*, product.productName, product.likes 
FROM company 
	LEFT JOIN Product ON Company.companyId = product.company;
    
SELECT * FROM ProductImage;
-- Lấy ảnh sản phẩm nổi bật cho từng sản phẩm
SELECT productImage.imageUrl, productimage.imageDesc, product.productName 
FROM productimage 
	right join Product ON productimage.product = product.id
WHERE product.id = 1 AND productimage.featureIn = 1; 

-- Lấy ảnh sản phẩm PHỤ cho từng sản phẩm
SELECT productImage.imageUrl, productimage.imageDesc, product.productName 
FROM productimage 
	right join Product ON productimage.product = product.id
WHERE product.id = 3 AND productimage.featureIn = 0; 


SELECT * FROM favorites;
SELECT * FROM ProductImage;
-- Danh sách product được yêu thích bởi người dùng.
SELECT product.*, productimage.imageUrl FROM (((Favorites
	INNER JOIN User ON favorites.customer = user.uid)
    INNER JOIN Product ON favorites.product = product.id)
	JOIN productimage ON favorites.product = productimage.product)
 WHERE favorites.customer = 3 AND productimage.featureIn = 1;

-- Sửa đơn vị cho các sản phẩm
SELECT * FROM Product;
UPDATE Product SET pricePerRatio = 'kg' WHERE id = 2 OR id = 3;

SELECT * FROM User WHERE nickname LIKE '%hu%';

SELECT product.productName, product.id, product.price, product.productType, product.posted_at, product.description, product.pricePerRatio,
  company.companyName, company.companyId,
  promotion.promocode, promotion.promotionId, 
  employee.firstName, employee.lastName FROM (((Product 
    INNER JOIN company ON product.id = company.companyId)
      INNER JOIN promotion ON product.promotion = promotion.promotionId)
      INNER JOIN employee ON product.employee = employee.empId);
      
SELECT product.id, product.productName, product.price, product.productType, product.likes, promotion.promoPercent, product.posted_at, product.description, product.pricePerRatio, company.companyName, product.company, promotion.promocode, employee.firstName, employee.lastName FROM (((Product 
        INNER JOIN Company ON product.company = company.companyId)
          INNER JOIN promotion ON product.promotion = promotion.promotionId)
          INNER JOIN employee ON product.employee = employee.empId);
          
SELECT * FROM company;

-- Hiển thị thông tin toàn bộ của 1 công ty bao gồm số lượng nhân viên, các thông tin bên lề.
SELECT employee.company, COUNT(empId) AS NumberOfEmp, company.location, company.companyName, company.phoneNumber FROM employee 
     INNER JOIN Company ON employee.company = company.companyId group by company;

-- Hiển thị thông tin của từng nhân viên trong 1 công ty bất kỳ và vai trò bất kỳ
SELECT employee.empId as id, employee.firstName, employee.lastName, employee.workingStatus, employee.created_at, user.email, user.phoneNumber, user.location, vaitro.positionName FROM ((Employee
	INNER JOIN User ON employee.user = user.uid)
    INNER JOIN vaitro ON employee.position = vaitro.posId)
    where employee.company = 1 AND vaitro.positionName = "Nhân viên";

-- Hiển thị danh sách nhân viên trong DB
SELECT employee.empId as id, employee.firstName, employee.lastName, employee.workingStatus, employee.created_at, user.email, user.phoneNumber, user.location, vaitro.positionName FROM ((Employee
	INNER JOIN User ON employee.user = user.uid)
    INNER JOIN vaitro ON employee.position = vaitro.posId);
    
-- Hiển thị thông tin của 1 employee
SELECT employee.empId as id, employee.firstName, employee.lastName, employee.workingStatus, employee.created_at, user.email, user.phoneNumber, user.location, user.avatarUrl, vaitro.positionName FROM ((Employee
	INNER JOIN User ON employee.user = user.uid)
    INNER JOIN vaitro ON employee.position = vaitro.posId)
WHERE empId = 1;

-- Hiển thị thông tin của 1 công ty
SELECT * FROM Company;

-- Hiển thị thông tin tài khoản + thẻ ngân hàng
SELECT user.nickname, user.email, user.phoneNumber, payment.* FROM Payment
	INNER JOIN User ON payment.user = user.uid;
    


