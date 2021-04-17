SELECT * FROM Payment;

SELECT * FROM hoadon;
SELECT hoadon.id, hoadon.shipping_address, hoadon.payment_method, hoadon.shipping_time, hoadon.comments, user.nickname, user.email, orderstatus.statusText, payment.amount, payment.creditNum FROM HoaDon 
	inner join user on hoadon.customer = user.uid
    inner join orderstatus on hoadon.statusCode = orderstatus.statusCode
    inner join payment on hoadon.creditCard = payment.creditNum
WHERE id = 1;
