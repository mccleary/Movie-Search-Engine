Movie App

You will make a movie search engine application using AngularJS, UI Router, Ajax, Angular Services, and the Movie Database API. The application will have 3 pages (pseudo-pages):

the search front page with large search box (think Google search)
the search results page (will also have a search box, but smaller)
the movie details page (you get here by drilling down to a search result)
Each of these pages will be linkable by its URL and therefore will be a state in the UI router configuration.

Step 1: Setup

From scratch, set up an AngularJS app with a dependency on UI Router. Here's a check list for you:

Create an index.html
Fetch angular.js and include it in index.html
Fetch angular-ui-router.js and include it in index.html
Make a movieapp.js and include it in index.html
Make a style.css and link it in index.html
Make an app module and activate it using the ng-app directive on an element on the page
Add the ui-view element to the page to act as the portal to the UI router
Add an app.config section which uses $stateProvider

Step 2: Search Page  <!-- see picture example of search page -->
You will implement the search page with a big search input field in the middle like the Google search page. When the user hits ENTER in the search field, it doesn't actually perform the search, but rather navigates to the Search Results Page, which will in turn perform the search and display the results - that's the next step.

define a state for the search page and associate it with a url, templateUrl, and controller. The url can be /search
create the template HTML file for the search page
create the controller for the search page
Recommendations:

center the form using text-align: center or the absolute positioning trick
put the search input field in a form
use the ng-submit directive on the form to call a function on submit
use $state.go to transition to the search result page with the text from the search form as a URL parameter
in the config section, set up a fallback URL using $urlRouterProvider in the config section to go to the URL for this page.

Step 3: Search Results Page - Part 1 <!-- see picture example of search page results 1 -->
For the search results page, again you will

define a state, this state will use a URL parameter to denote the search query which the user entered
create a template HTML file
create a controller
At the time of controller initialization (immediately inside body of the controller function), you will
make an AJAX call to the search movies API, you will need to get the query text to search from $stateParams which gives you the value of the URL parameter
within the success callback function, you will
console.log the returned data to learn its structure - this is important because it is what you'll use to navigate the data and render it in the template. Another way of examining the data is within Postman.       Hint: you'll need to drill down to the results property
assign the search results to a scope variable
in the template file, use the ng-repeat directive to loop through the result data and then display the name of each movie returned in a list on the page.
Step 4: Search Results Page - Part 2

In part two of building out the search results page, you will render the poster images of the movies instead of just the movie titles.

Within each movie object that's returned by the search, there is a poster_path property which contains a path to a .jpg file, which looks something like "/xfWac8MTYDxujaxgPVcRD9yZaul.jpg". As you can see, this is not a full URL and needs to be prepended with some base URL page. You may prepend the string: "https://image.tmdb.org/t/p/w500" to it to get:

https://image.tmdb.org/t/p/w500/xfWac8MTYDxujaxgPVcRD9yZaul.jpg

And this URL will give the 500px wide poster for Doctor Strange. However, you can get other poster sizes as well. The configuration API will give you information about what size posters are available, and to change the poster size, you just need to change the w500 part to a different width. For your convenience, I've listed the available sizes here:

w45
w92
w154
w185
w300
w342
w500
h632
w780
w1280
original
Choose the size of movie poster that you want to use for the search results listing, and tile the images in a grid.

Recommendations:

use floats or the bootstrap grid system to layout out the tiles in a grid with a dynamic number of rows
you may find that some movies don't have a poster and that throws off the layout, to fix this, I recommend giving the container of each poster image a fixed size that's equal to the dimensions of the image, and then conditionally rendering just the movie title within the container in the case that the movie_poster property of the movie is undefined. To hide the <img> element, I recommend using the ng-if directive instead of ng-show because ng-if will prevent the browser from making a request for the image - which would cause a 404 error for the URL https://image.tmdb.org/t/p/w185/ to show up in the console.
Step 5: Service Extraction

Extract the AJAX call you made using $http into an AngularJS service, let's call it the Movie service. The service will have a search method that takes in a query parameter, and returns a promise that will contain the search results.

Step 5: Movie Details Page <!-- see picture example of movie details page-->
We'll make each search result that's displayed in Steps 3 & 4 clickable and link to the movie details page for that movie.

create a new state for the movie details page, it will use a URL parameter which represents the ID of a movie
create a template HTML file for this page
create a controller for this page
add a details method to the Movie service which takes a movie ID as input and returns a promise which will contain the details for that movie.
at the time of controller initialization, make a call to the Movie.details method to fetch the details for this movie. You'll need to use $stateParams which will allow you to the the ID from the URL parameter.
within the success callback function - when the results come back, you will assign the return movie details to a scope variable
in the template, you will display the movie details onto the page. Including:
movie title
movie poster
movie overview / plot
link to the homepage of the movie if it exists
runtime
release date
genres
Back in the search results page, for each li that displays a movie poster or title, use the ui-sref directive (yes, it works on things other than links too) to link over to the movie details page for that movie by its ID.
Bonus: Paginate the results

The movie database search API provides pagination functionality. Read its documentation to figure out how it works and implement a user interface to allow users to navigate through multiple pages worth of search results.
