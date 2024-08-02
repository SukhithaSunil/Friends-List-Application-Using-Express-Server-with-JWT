const express = require('express')


const app = new express()

app.listen(3000, (req, res) => {
    console.log("listening at 3000")
})