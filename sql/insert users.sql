SELECT * FROM user;

insert INTO User values (1,'Hung Nguyen','2017-07-23','Male','Ha Noi','0973471728','imbayonline@gmail.com','abc');

insert INTO User(nickname,created_at,gender,location,phoneNumber,email,avatarUrl) values ('Hello World','2017-07-25','Female','Thai Binh','098452521','grace_14@gmail.com','4t45');

insert INTO User(nickname,created_at,gender,location,phoneNumber,email,avatarUrl) values ('Master Y',now(),'Male','Ionia','0984542521','masteryi@gmail.com','google.com');