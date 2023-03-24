create table Game ( 
	id int identity(1,1) primary key,
	date nvarchar(64) not null,
	spy nvarchar(64) foreign key References Players(email),
	agents nvarchar(64) foreign key References Players(email),
	steps int not null,
	winner nvarchar(64) foreign key References Players(email)
)
