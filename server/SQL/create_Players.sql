create table Players(
    email nvarchar(64) primary key,
	password nvarchar(30),
	firstName nvarchar(30) not null,
	lastName nvarchar(30) not null,
)