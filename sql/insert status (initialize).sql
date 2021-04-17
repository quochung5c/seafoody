SELECT * FROM orderstatus;

INSERT INTO orderstatus values (1,'Chưa tiếp nhận','gray','Bộ phận công ty chưa nhận được đơn mua hàng của người dùng');
INSERT INTO orderstatus values (2,'Đang xử lý','black','Bộ phận công ty đã tiếp nhận đơn và đang xử lý');
INSERT INTO orderstatus values (3,'Đang chuyển hàng','green','Hàng đã đặt đang được chuyển đến khách hàng');
INSERT INTO orderstatus values (4,'Đã hoàn thành','green','Hàng đặt đã được chuyển tới khách hàng.');
INSERT INTO orderstatus values (0,'Lỗi tiếp nhận','red','Đẫ có lỗi xảy ra. Vui lòng kiểm tra lại đơn hàng.');

