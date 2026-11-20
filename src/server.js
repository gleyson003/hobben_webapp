import express from "express";

import interests from "./data/interests.js";
import subinterests from "./data/subinterests.js";
import groups from "./data/groups.js";

import { matchGroups } from "./services/matchingService.js";


// Creates the Express web application and defines
// the port used by the local development server.
const app = express();
const PORT = 3000;


// Configures EJS as the server-side template engine.
app.set("view engine", "ejs");


// Serves static files such as CSS from the public directory.
app.use(express.static("public"));


// Allows Express to read data submitted through HTML forms.
app.use(express.urlencoded({ extended: true }));


// Dynamically generates the home page.
// Interests and subinterests are passed from the server
// to the EJS template instead of being hard-coded in HTML.
app.get("/", (req, res) => {

    res.render("index", {
        interests,
        subinterests
    });
});


// Receives the user's preferences from the home page
// and dynamically generates community recommendations.
app.post("/recommendations", (req, res) => {

    // Creates a temporary user object using the form data.
    // Form values are converted from strings to numeric IDs
    // so they can be processed by the recommendation engine.
    const user = {
        id: 1,
        name: req.body.name,

        interests: []
            .concat(req.body.interests || [])
            .map(Number),

        subinterests: []
            .concat(req.body.subinterests || [])
            .map(Number)
    };


    // Validates the maximum number of interests and subinterests
    // submitted by the user before generating recommendations.
    // Invalid input returns an HTTP 400 Bad Request response.
    if (user.interests.length > 4) {
        return res.status(400).send(
            "You can select a maximum of 4 interests."
        );
    }

    if (user.subinterests.length > 5) {
        return res.status(400).send(
            "You can select a maximum of 5 subinterests."
        );
    }


    // Sends the user's preferences to the recommendation engine
    // and renders the results dynamically using EJS.
    try {

        const recommendations = matchGroups(
            user,
            groups,
            interests,
            subinterests
        );

        res.render("recommendations", {
            user,
            recommendations
        });

    } catch (error) {

        res.status(400).send(
            `Unable to generate recommendations: ${error.message}`
        );
    }
});


// Dynamically generates the details page for a specific community.
// The community ID is received as a URL route parameter.
app.get("/community/:id", (req, res) => {

    // Converts the route parameter to a number.
    const groupId = Number(req.params.id);

    // Finds the community that matches the requested ID.
    const group = groups.find(
        group => group.id === groupId
    );


    // Returns an HTTP 404 response when the requested
    // community does not exist.
    if (!group) {
        return res.status(404).send(
            "Community not found."
        );
    }


    // Converts the community's interest IDs into
    // complete interest objects for the EJS template.
    const groupInterests = interests.filter(
        interest =>
            group.interests.includes(interest.id)
    );


    // Converts the community's subinterest IDs into
    // complete subinterest objects for the EJS template.
    const groupSubinterests = subinterests.filter(
        subinterest =>
            group.subinterests.includes(subinterest.id)
    );


    // Renders the third dynamic page using information
    // determined by the community selected by the user.
    res.render("community", {
        group,
        groupInterests,
        groupSubinterests
    });
});


// Starts the Express development server on the local computer.
app.listen(PORT, () => {
    console.log(
        `Hobben is running at http://localhost:${PORT}`
    );
});