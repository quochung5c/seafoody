ALTER TABLE Product ADD likes int;

ALTER TABLE Product MODIFY COLUMN likes int default 0;

SELECT * FROM Product;

