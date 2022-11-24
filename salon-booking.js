module.exports = function salonBooking(db) {

    async function findStylist(phoneNumber) {
        var db_results = await db.manyOrNone('select * from stylist where phone_number = $1', [phoneNumber])
        return db_results
    }

    async function findClient(phoneNumber) {
        var db_results = await db.manyOrNone('select * from client where phone_number = $1', [phoneNumber])
        return db_results
    }

    async function findTreatment(code) {
        var db_results = await db.manyOrNone('select code from treatment where code = $1', [code])
        return db_results
    }

    async function findAllTreatments() {
        var db_results = await db.manyOrNone('select * from treatment')
        return db_results
    }

    async function makeBooking(clientId, treatmentId, stylistId, date, time) {
        var db_results = await db.none('INSERT INTO booking(client_id, treatment_id, stylist_id, booking_date, booking_time) values($1,$2,$3,$4,$5)', [clientId, treatmentId, stylistId, date, time])
        return db_results
    }

    async function findAllBookings(date) {
        var db_results = await db.manyOrNone('select * from booking where booking_date = $1', [date])
        return db_results
    }

    async function findClientBookings(clientId) {
        var db_results = await db.manyOrNone('select * from booking where client_id = $1', [clientId])
        return db_results
    }

    return {
        findStylist,
        findClient,
        findTreatment,
        findAllTreatments,
        makeBooking,
        findAllBookings,
        findClientBookings
    }
}  