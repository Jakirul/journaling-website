# LAP 1 Project: Community Journalling Website

A project to create an anonymous community journalling website, made for the project week of LAP 1
of the futureproof Conway cohort. We designed a website where users can share and react to jokes.
The website includes a page where users can submit a joke and add a gif from giphy if they want.
There is also a page which displays all the submitted jokes and users can comment on them and react
to them using three emoji reactions. The jokes display page initially only displays the set up for
the jokes, the user can click a button to reveal the punchline of the joke and view/add comments and
reaction emojis.

## Installation and Usage

**Installation**

- Clone or download the repository
- Navigate to the server folder
- Run `npm install` to install dependencies

**Usage**

- Still in the server folder, run `npm node` to start the server
- In your browser, open `index.html` to use the website
- View the list of jokes stored by using the navigation bar on the website, or opening `jokes.html`

## Technologies

The front end was created using HTML5 and CSS3, with JavaScript to add functionality. This project
makes use of the giphy API to generate the gifs used in the posts.

The back end was created using `node.js` and `express.js` to create the server.

## Process

## Wins and challenges

**Wins**

- Making use of the giphy API
- Finding a way to work with different JavaScript on different HTML files without having to link
  different files in each html head
- Adding a way to sort the jokes in differnet orders from a dropdown menu

**Challenges**

- In development, there was sometimes a bug that meant adding a reaction caused an error when fetching
  the information to reload the webpage


## Licence

## Contributors

- Jakirul Islam
- Emily Kral
- Peter Andrews-Briscoe
- Urselaan Malik
