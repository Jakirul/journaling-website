
# LAP 1 Project: Community Journaling Website

  Contributors:
 - [Jakirul Islam](https://github.com/Jakirul/)
- [Emily Kral](https://github.com/EmilyKral)
- [Peter Andrews-Briscoe](https://github.com/PeterAndrewBriscoe)
- [Urselaan Malik](https://github.com/umalik00)

## Project Description
A project to create an anonymous community journaling website, made for the project week of LAP 1 of the futureproof Conway cohort. We designed a website where users can share and react to jokes. The website includes a page where users can submit a joke and add a gif from giphy if they want. There is also a page which displays all the submitted jokes and users can comment on them and react to them using three emoji reactions. The jokes display page initially only displays the set up for the jokes, the user can click a button to reveal the punchline of the joke and view/add comments and reaction emojis.

 The website can be viewed in this link: https://lap1-jokes.netlify.app/

## Installation and Usage

**Installation**
- Clone or download the repository
- Navigate to the `server` folder
- Run `npm install` to install dependencies
- (If you want to test client side, please run `npm install` inside the `client` folder too)

**Usage**
- In the `server` folder, run `npm run node` or `npm start` to start the server
- In your browser, open `index.html` to use the website
- View the list of jokes stored by using the navigation bar on the website, or opening `jokes.html`

## Testing

### Client Testing
- In the `client` folder, run `npm run coverage` or `npm test`
- In the `server` folder, run `npm run coverage` or `npm test`
  
## Technologies

### Front end:
- HTML / CSS
- JavaScript
- Giphy API
- Jest / Supertest / Coverage

### Backend:
- Node.js
- Express.js
- Jest / Supertest / Coverage
- Cors
- Nodemon
- Bundles

## Process
- Started by planning the design and creating various folders to make our code more modular
- Built the back end of the website:
	- Created the model for the Post then created tests to make sure the functionality works as expected
	- Also created the controller to make the code neater and also a data JSON to store our information
- Built the front end of the website:
	- Coded the design using HTML and CSS
	- We then fetched data using JavaScript to GET, POST and PUT information from/to the JSON file
	- We wrote tests for the front end too.
	- Organised the JavaScript functions into different files using bundles to allow for modularity 
	- Got the GIPHY API to work as expected
- Deployment:
	- Deployed the backend first using `Heroku` then deployed the front end using `Netlify`

## Wins and challenges

**Wins**
- Making use of the giphy API
- Finding a way to work with different JavaScript on different HTML files without having to link different files in each html head
- Adding a way to sort the jokes in different orders from a dropdown menu
- Successfully hosting the application
- Achieved over 60% test coverage for both the client and server folder

  

**Challenges**
- In development, there was sometimes a bug that meant adding a reaction caused an error when fetching the information to reload the webpage
	- This was fixed once we deployed the server
- Had some difficulty in the beginning with testing but we managed to overcome this problem.
  

## Images

The home page
![alt](https://i.gyazo.com/4ff4012153924b20b935629b2b7dc109.png)
  
  Once you click on "Create a Joke", it will take you to this page
![alt](https://i.gyazo.com/d5d2f4c08fe8ca7350b5c0ee996f1a48.png)

Once a gif is selected, the gif list will be replaced by the gif that you clicked on
![alt](https://i.gyazo.com/470daed27754134f134a4a96c9fba13d.png)

Once the form has been submitted, you'll be taken to the Jokes List page
![alt](https://i.gyazo.com/19a0e30f97a9c86c61bd6d8dc18e2f48.png)

Clicking on 'Show Punchline' shows you the punchline and the comment section
![alt](https://i.gyazo.com/b7829765a2eaa3f561d1d73cc61f0835.png )

## Licence
[MIT license](https://opensource.org/licenses/mit-license.php)
 
