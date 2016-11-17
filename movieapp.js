var app = angular.module('movie-app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state({
    name: 'search',
    url: '/',
    templateUrl: 'search.html',
    controller: 'MainController'
  })
  .state({
    name: 'searchResults',
    url: '/search/{query}',
    templateUrl: 'searchResults.html',
    controller: 'SearchResultsController'
  })
  .state({
    name: 'details',
    url: '/details/{query}',
    templateUrl: 'details.html',
    controller: 'ResultsController'
  });

  $urlRouterProvider.otherwise('/');
});

app.controller('SearchResultsController', function($scope, $stateParams, MovieService) {
  MovieService.searchMovie($stateParams.query)
  .success(function(movieResults) {
    $scope.movieResults = movieResults;
    console.log('Movie results', movieResults);
  });
  console.log ($stateParams.query);
});

app.controller('MainController', function($scope, MovieService, $stateParams, $state) {
  $scope.search=function() {
    $state.go('searchResults', {query: $scope.query});
  };
});

app.controller('ResultsController', function($scope, $stateParams, MovieService) {
  MovieService.details($stateParams.query)
  .success(function() {
    console.log('details');
    $scope.results = details.results;
  });
});


app.factory('MovieService', function($http) {
  var service = {};
  var API_KEY ='4b060defbae01c3cc97648c1c588340d';
  service.nowPlaying = function() {
    var url = 'http://api.themoviedb.org/3/movie/now_playing';
    return $http({
      method: 'GET',
      url: url,
      params: { api_key: API_KEY }
    });
  };

  service.movieDetails = function(movieId) {
    var url = 'http://api.themoviedb.org/3/movie/' + movieId;
    return $http({
      method: 'GET',
      url: url,
      params: { api_key: API_KEY }
    });
  };

  service.searchMovie = function(query) {
    var url = 'http://api.themoviedb.org/3/search/movie';
    return $http({
      method: 'GET',
      url: url,
      params: { api_key: API_KEY,
                query: query}
    });
  };
  return service;
});



// example of .state linking to controller(see controller below)
// .state({
//   name: 'fony',
//   url: '/fony/{thing}/{thing2}',
//   templateUrl: 'fony.html',
//   controller: 'MainController'
// })

// app.controller('MainController', function($scope, MovieService, $stateParams, $state) {
//   // example of linking to .state(see app.cofig above)
//   // $stateParams.thing
//   // $stateParams.thing2
//   $scope.search=function() {
//     // console.log('searchResults')
//     $state.go('searchResults', {query: $scope.query});
//   };
// });
