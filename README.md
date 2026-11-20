# Overview
Hobben is a responsive web application built with Node.js, Express, and EJS that helps users discover small communities based on shared interests and subinterests. Users select their preferences, and the application dynamically generates ranked community recommendations using a compatibility-based recommendation engine.

To run the application locally, install the dependencies with npm install and start the Express server with npm start


[Software Demo Video](https://youtu.be/Vyfgk-rECQE)

# Web Pages
The web app includes three dynamically generated pages:

- Home / Preferences Page: This page displays the available interests and subinterests dynamically from the application data. The user enters a name and selects up to 4 interests and 5 subinterests. Submitting the form sends the selections to the server and transitions to the Recommendations page.

- Recommendations Page: The server processes the user's selections through the Hobben recommendation engine and dynamically displays communities ranked by compatibility score. The top five matches are shown as recommended communities. Users can select View Community to open the details for a specific group.

- Community Details Page: This page is dynamically generated using the community ID from the URL. The same EJS template displays different content depending on the selected community, including its name, interests, subinterests, and current number of members.


# Development Environment
I used Visual Studio Code to develop the application, Node.js and Express to run the local web server, npm to manage dependencies, and Git/GitHub for version control.

The application was written in JavaScript using EJS for dynamically generated web pages and Lodash to support the recommendation engine. CSS was used to create a responsive interface for mobile, tablet, and desktop screens.


# Useful Websites
- [express](https://expressjs.com/),
- [EJS](https://ejs.co/)
- [Lo - Lodash](https://lodash.com/docs/)
- [Node.js](https://nodejs.org/docs/latest/api/)
- [mdn](https://developer.mozilla.org/)

# Future Work
- Add a cloud database to persist users, communities, interests, and subinterests.
- Implement user accounts and authentication, including email/password and Google sign-in.
- Allow users to create and join communities and view the groups they participate in.
- Improve recommendations by considering additional information such as location, group availability, and meeting preferences.
- Continue improving the responsive interface and overall user experience.
