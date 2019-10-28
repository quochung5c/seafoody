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



