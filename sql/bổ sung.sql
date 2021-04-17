
SELECT * FROM hoadon;

-- Select lại hóa đơn
SELECT user.nickname, user.email, user.phoneNumber, orderstatus.statusText, hoadon.* from Hoadon
INNER JOIN user ON hoadon.user = user.uid
inner join orderstatus on hoadon.statusCode = orderstatus.statusCode
WHERE hoadon.id = 6;

SELECT QL_Hoadon.*, promotion.promoPercent from (SELECT product_hoadon.id, product_hoadon.qty, product.promotion, product.pricePerRatio, product.id AS productId, product.productName, product.price AS pricePerProduct, (product.price*product_hoadon.qty) AS sumOfProduct FROM product_hoadon
	INNER JOIN product ON product_hoadon.product = product.id WHERE hoadon = 6) AS QL_Hoadon 
    INNER JOIN promotion ON QL_Hoadon.promotion = promotion.promotionId;

INSERT INTO product_hoadon VALUES (1,7,2,6);
INSERT INTO product_hoadon (HoaDon,qty,product) VALUES (7,1,7);
INSERT INTO product_hoadon (HoaDon,qty,product) VALUES (6,3,2);


SELECT * FROM Promotion;