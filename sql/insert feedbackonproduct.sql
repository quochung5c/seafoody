
-- INSERT Feedback on Product
select * from feedbackonproduct;
ALTER TABLE feedbackonproduct modify column created_at timestamp default now();
INSERT INTO feedbackonproduct(user,product,fopText) values (1,2,'Tuyệt vời');
INSERT INTO feedbackonproduct(user,product,fopText) values (2,1,'Rất ngon');
INSERT INTO feedbackonproduct(user,product,fopText) values (3,3,'WOW');

-- INSERT Feedback on weebsite
select * from feebackonsite;
ALTER TABLE feebackonsite modify column created_at timestamp default now();
ALTER TABLE feebackonsite add fbStatus enum('Đã tiếp nhận','Đang phản hồi') default 'Đang phản hồi';
INSERT INTO feebackonsite(fosType,user,fosText) values ('Bao cao',3,'Web xấu');
INSERT INTO feebackonsite(fosType,user,fosText) values ('Gop y',1,'Mình rất thích đồ ăn ở đây');
INSERT INTO feebackonsite(fosType,user,fosText) values ('Bao cao',2,'Mình thấy đồ ăn không ngon');
INSERT INTO feebackonsite(fosType,user,fosText) values ('Gop y',2,'Mình thích giao diện web này');
INSERT INTO feebackonsite(fosType,user,fosText) values ('Bao cao',1,'Công ty chưa phản hồi feedback');

SELECT * FROM Product;

-- INSERT Product Images
SELECT * FROM productimage;
INSERT INTO productimage(imageUrl,imageDesc,featureIn,product) VALUES ('fried.com','khô mực',true,3);
INSERT INTO productimage(imageUrl,imageDesc,featureIn,product) VALUES ('dokho.com','Mực khô',false,3);
INSERT INTO productimage(imageUrl,imageDesc,featureIn,product) VALUES ('muckho','Nhiều con mực khô',false,3);
INSERT INTO productimage(imageUrl,imageDesc,featureIn,product) VALUES ('friedsquid','Con mực khô đáng yêu',false,3);

-- INSERT Favorites
SELECT * from favorites;
SELECT * FROM Product WHERE id = 1;
SELECT * FROM user;

ALTER TABLE favorites ADD likes_at timestamp default now();

-- Likes action
INSERT INTO Favorites(product,customer) VALUES (1,1);
UPDATE Product SET likes = likes + 1 WHERE id = 1;

INSERT INTO Favorites(product,customer) VALUES (1,2);
UPDATE Product SET likes = likes + 1 WHERE id = 1;

INSERT INTO Favorites(product,customer) VALUES (2,3);
UPDATE Product SET likes = likes + 1 WHERE id = 2;

INSERT INTO Favorites(product,customer) VALUES (3,3);
UPDATE Product SET likes = likes + 1 WHERE id = 3;


INSERT INTO Favorites(product,customer) VALUES (4,2);
UPDATE Product SET likes = likes + 1 WHERE id = 4;

SELECT product.nickname, user.email FROM Favorites
	INNER JOIN Product ON favorites.product = product.id
    INNER JOIN User ON favorites.customer = user.uid
WHERE product.id = 1;

SELECT * FROM product;

-- Edit feedback on product and on site
SELECT * FROM feebackonsite;

ALTER TABLE feebackonsite ADD fosImage varchar(255);
ALTER TABLE feedbackonproduct ADD fopImage varchar(255);

CREATE TABLE FeedbackType (
	typeId int not null unique primary key,
    feebackText varchar(100),
    typeDesc varchar(255)
);

SELECT * FROM FeedbackType;
INSERT INTO FeedbackType VALUES (101,'Báo cáo','Báo cáo những sai sót trong quá trình sử dụng');
INSERT INTO FeedbackType VALUES (102,'Góp ý', 'Đề xuất trong việc phát triển, sản xuất');
INSERT INTO FeedbackType VALUES (103,'Khác','Đánh giá khác liên quan đến sản phẩm');


SELECT * FROM feedbackonproduct;

SELECT * FROM orderstatus;