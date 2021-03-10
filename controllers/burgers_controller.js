const express = require("express");

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

const router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log("this is working")
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function (req, res) {
    burger.InsertOne([
        "burger_name", "devoured",
    ], [
            req.body.burger_name, 0
        ], function (result) {
            // Send back the ID of the new quote
            res.json({ burgerId: result.burger_name });
        });
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = "burgersId = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne(
        {
            devoured: 1
        },
        condition,
        function (result) {
            if (result.changedRows === 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            }
            res.status(200).end();

        }
    );
});
// Export routes for server.js to use.
module.exports = router;
