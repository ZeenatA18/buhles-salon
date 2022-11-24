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
        // const client = await booking.findClient("Zee");

         await booking.makeBooking(1 , 2 , 1 ,'2022-11-23', '07:00:00');
         await booking.makeBooking(1 , 2 , 1 ,'2022-11-26', '07:00:00');

        const bookings = await booking.findClientBookings(1);
        console.log(bookings);
        assert.deepEqual([ {
            booking_date: new Date('2022-11-22T22:00:00.000Z'),
            booking_time: '07:00:00',
            client_id: 1,
            id: 78,
            stylist_id: 1,
            treatment_id: 2
          }], bookings);
    });

//     it("should be able to allow a client to make a booking", async function () {
//         await booking.client('Zee', 'Avontuur', '062 166 8479')

// let userid = await booking.clientID(Zee)

//         const bookings = await booking.makeBooking(user, 2, 3, '2022-11-24', '07:00:00');

//         assert.equal([], bookings)
//     })

    // it("should be able to get bookings for a date", async function () {
    //     // const client1 = await booking.findClient("Zee");
    //     // const client2 = await booking.findClient("***");
    //     // const treatment1 = await booking.findTreatment("mua");
    //     // const treatment2 = await booking.findTreatment("***");
    //     // const stylist1 = await booking.findTreatment("mua");

    //     await booking.makeBooking(1 , 2 , 1 ,'2022-11-24', '07:00:00');
    //     // await booking.makeBooking(treatment2.id, client1.id, date, time);
    //     // await booking.makeBooking(treatment1.id, client2.id, date, time);

    //     const bookings = await booking.findAllBookings('2022-11-24');

    //     assert.equal([  {
    //         //   "booking_date": ['Date': '2022-11-23T22:00:00.000Z'],
    //           "booking_time": "07:00:00",
    //           "client_id": 1,
    //           "id": 9,
    //          "stylist_id": 1,
    //          "treatment_id": 2
    //           }], bookings);

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