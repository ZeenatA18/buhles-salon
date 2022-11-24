-- Add insert scripts here

insert into treatment (type, code, price) values ('Pedicure', 'pdi', '175');
insert into treatment (type, code, price) values ('Manicure', 'mni', '215');
insert into treatment (type, code, price) values ('Make up', 'mua', '185');
insert into treatment (type, code, price) values ('Brows & Lashes', 'b&l', '240');

insert into stylist (first_name, last_name, phone_number, commission_percentage) values ('Kelly', 'Adams', '066 123 4566', '0.10');
insert into stylist (first_name, last_name, phone_number, commission_percentage) values ('Charles', 'Baker', '012 345 6789', '0.10');
insert into stylist (first_name, last_name, phone_number, commission_percentage) values ('Michelle', 'Mue', '064 123 4556', '0.10');

insert into client(first_name, last_name, phone_number) values ('Zee', 'Avontuur', '062 166 8478');
insert into client(first_name, last_name, phone_number) values ('Vee', 'Adams', '062 111 8478');


insert into booking(client_id, treatment_id, stylist_id, booking_date, booking_time) values ('1', '2', '1','24 November 2022', '11:58');
insert into booking(client_id, treatment_id, stylist_id, booking_date, booking_time) values ('2', '2', '3','24 November 2022', '11:58');
