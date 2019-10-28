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
UPDATE Product SET likes = likes + 1 WHERE id = 2;

INSERT INTO Favorites(product,customer) VALUES (2,3);
UPDATE Product SET likes = likes + 1 WHERE id = 3;

INSERT INTO Favorites(product,customer) VALUES (3,3);
UPDATE Product SET likes = likes + 1 WHERE id = 3;

SELECT * FROM Favorites;
SELECT * FROM product;

