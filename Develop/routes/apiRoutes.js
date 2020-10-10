// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const fs = require("fs");
const path = require("path");




// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/notes", function (req, res) {
        console.log("api/notes");
        // Reading the db.json file and returning data in the response variable
        fs.readFile("./db/db.json", "utf8", function (err, response) {
            if (err) {
                console.log(err);
            }
            console.log(response);
            // Converting the response into a JSON object
            let allNotes = JSON.parse(response)
            // Rendering the allNotes data
            res.json(allNotes);
        })

    });



    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/notes", function (req, res) {
        console.log("creating a new note" + req.body);
        fs.readFile("./db/db.json", "utf8", function (err, response) {
            if (err) {
                console.log(err);
            }
            console.log(response);
            // Converting the response into a JSON object
            let allNotes = JSON.parse(response)
            console.log("new note" + req.body);

            allNotes.push(req.body)
            console.log("combined", allNotes);
            // updating db json file with new data
            fs.writeFile("./db/db.json", JSON.stringify(allNotes), err => {
                if (err) {
                    console.log(err);

                }
                res.json({ success: true, msg: 'Created new note' });
                console.log("NOTE CREATED!", req.body);
            })
        })
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body parsing middleware

    });

    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

    // Empty out the arrays of data
    app.delete("/api/notes:id", function (req, res) {
        savedNotes.forEach(note => {
            if (note.id == req.params.id) {
                savedNotes.splice(savedNotes.indexOf(note), 1);
            }
        })
        fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(savedNotes, null, 2));
        res.send("Note Deleted")
        

    });

    
}