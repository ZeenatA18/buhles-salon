const assert = require('assert');
const SalonBooking = require('../salon-booking.js')
const pgp = require('pg-promise')();


// TODO configure this to work.
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:pg123@localhost:5432/salon_test";

const config = {
    connectionString: DATABASE_URL
}

const db = pgp(config);

let booking = SalonBooking(db);

describe("The Booking Salon", function () {

    beforeEach(async function () {

        await db.none(`delete from booking`);

    });

    it("should be able to list treatments", async function () {

        const treatments = await booking.findAllTreatments();
        assert.deepEqual([{ type: 'Pedicure' }, { type: 'Manicure' }, { type: 'Make up' }, { type: 'Brows & Lashes' }], treatments);
    });

    it("should be able to find a stylist", async function () {

        const stylist = await booking.findStylist("");
        assert.equal('', stylist);
    });

    it("should be able to get client booking(s)", async function () {

        await booking.makeBooking(1, 2, 1, '2022-11-23', '07:00:00');
        await booking.makeBooking(1, 2, 1, '2022-11-26', '07:00:00');

        const bookings = await booking.findClientBookings(1);

        assert.deepEqual([{
            booking_date: new Date('2022-11-22T22:00:00.000Z'),
            booking_time: '07:00:00',
            client_id: 1,
            stylist_id: 1,
            treatment_id: 2
        },
        {
            booking_date: new Date('2022-11-25T22:00:00.000Z'),
            booking_time: '07:00:00',
            client_id: 1,
            stylist_id: 1,
            treatment_id: 2
        }], bookings);
    });

    // it("should be able to allow a client to make a booking", async function () {
    //     const client = await booking.findClient("062 166 8478");
    //     console.log(client);
    //     const clientID = await booking.clientID('Zee')
    //     // console.log(clientID);

    //     const book = await booking.makeBooking(1, 2, 1, '2022-11-23', '07:00:00');
    //     // console.log(book);/
    //     const bookings = await booking.findAllBookings(client);
    //     // console.log(bookings);

    //     assert.equal([], bookings);
    // })

    // it("should be able to get bookings for a date", async function () {
    //     const client1 = await booking.findClient("***");
    //     const client2 = await booking.findClient("***");

    //     const treatment1 = await booking.findTreatment("***");
    //     const treatment2 = await booking.findTreatment("***");

    //     await booking.booking(treatment1.id, client1.id, date, time);
    //     await booking.booking(treatment2.id, client1.id, date, time);
    //     await booking.booking(treatment3.id, client2.id, date, time);

    //     const bookings = await booking.findAllBookings({date, time});

    //     assert.equal([], bookings);

    // });

    // it("should be able to find the total income for a day", function() {
    //     assert.equal(1, 2);
    // })

    // it("should be able to find the most valuable client", function() {
    //     assert.equal(1, 2);
    // })
    // it("should be able to find the total commission for a given stylist", function() {
    //     assert.equal(1, 2);
    // })

    after(function () {
        db.$pool.end()
    });

});