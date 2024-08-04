const express = require('express')
const router = express.Router()

let friends = {
    "johnsmith@gamil.com": { "firstName": "John", "lastName": "Doe", "DOB": "22-12-1990" },
    "annasmith@gamil.com": { "firstName": "Anna", "lastName": "smith", "DOB": "02-07-1983" },
    "peterjones@gamil.com": { "firstName": "Peter", "lastName": "Jones", "DOB": "21-03-1989" }
};

router.get('/', (req, res) => {
    res.send(JSON.stringify({ friends }))
})

router.get('/:email', (req, res) => {
    const email = req.params.email
    if(friends[email])
    res.send(friends[email])
    else
    res.send(`Unable to find friend`)
})

router.post('/', (req, res) => {
    if (req.body.email) {
        friends[req.body.email] = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            DOB: req.body.DOB
        }
    }
    res.send(`The friend ${req.body.firstName} has been added`)
})

router.put('/:email', (req, res) => {
    const email = req.params.email
    const friend = friends[email]
    if (friend) {
        if (req.body.DOB)
            friend['DOB'] = req.body.DOB
        if (req.body.firstName)
            friend['firstName'] = req.body.firstName
        if (req.body.lastName)
            friend['lastName'] = req.body.lastName
        friends[email] = friend

        res.send(`Friend with the email ${email} updated.`)
    }
    else
        res.send(`Unable to find friend`)
})

router.delete('/:email', (req, res) => {
    const email = req.params.email
    const friend = friends[email]
    if (friend) {
        delete friends[email]
        res.send(`Friend with the email ${email} deleted.`)
    }
    else
    res.send(`Unable to find friend`)

})

module.exports = router