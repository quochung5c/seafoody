SELECT * FROM user;

insert INTO User values (1,'Hung Nguyen','2017-07-23','Male','Ha Noi','0973471728','imbayonline@gmail.com','abc');

insert INTO User(nickname,created_at,gender,location,phoneNumber,email,avatarUrl) values ('Hello World','2017-07-25','Female','Thai Binh','098452521','grace_14@gmail.com','4t45');

insert INTO User(nickname,created_at,gender,location,phoneNumber,email,avatarUrl) values ('Master Y',now(),'Male','Ionia','0984542521','masteryi@gmail.com','google.com');

insert INTO User (nickname,created_at,gender,location,phoneNumber,email,avatarUrl,password) values ('Hùng Nguyễn',NOW(),'Male','Hà Nội',0985694605,'imbayonline@gmail.com','http://www.gravatar.com/avatar/eb9fd80527bfe7752cc7d9cef58f9372?s=200&d=retro&r=pg','$2a$10$X5OJMDAmsTBMLuEi1KI6sOdNGX3sXraNPXgMbLMzuZD.JQsgctxpe');

DELETE FROM user WHERE uid = 1;
Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails (`seafoody`.`feebackonsite`, CONSTRAINT `feebackonsite_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`uid`))
