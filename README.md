# Pixelbox Creator
Pixelbox is a library of scripts to create layered parallax image visualization that responds to the movement of the mouse. The Pixelbox Creator is an app used to generate and save individual Pixelbox frames for use in web development.

## Installation
The dependencies for this project are listed in the package.json. Run 'npm install' to get started.

## Database
The project was created with a Postgres SQL database running in Postico. See the database.sql file for queries to create the necessary tables.

## Getting Started
Open two bash terminals. Get the server started up:
```bash
npm run server
```
Get the client started up:
```bash
npm run client
```

## Technology Used
This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

Of note on the front end is the use of jQuery hosted within React (backwards compatability with a script library for the frames writen in jQuery), style-components for creating dynamic components, and the react-beautiful-dnd for the layer interface.

## Thank You
I owe a big thank you to my teachers, Mary and Dev, along with the entirety of my Trifid cohort at Prime Digital Academy.

And a big thanks to you, dear reader, for taking a look at my project.