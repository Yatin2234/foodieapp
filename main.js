var foodieApp = angular.module('foodieApp',['ngRoute']);

foodieApp.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'pages/login.html',
		controller: 'loginController'
	})
	.when('/home',{
		templateUrl: 'pages/home.html',
		controller: 'mainController'
	})
	.when('/restaurant/:id', {
		templateUrl: 'pages/restaurant.html',
		controller: 'restaurantController'
	})
	.when('/fav', {
		templateUrl: 'pages/fav.html',
		controller: 'favController'
	})
})

foodieApp.controller('loginController',function($scope,$location) {
$scope.goToHome= function(){
	// console.log('Do Something')
	$location.url('home')
}
})
foodieApp.controller('restaurantController',function($scope,$routeParams,$http) {
	//Empty
	//console.log($routeParams.id);
	$scope.ingredients = [];


	$scope.getIngredients = function(url) {
	// Do something
	var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}'
	    $http({
	        'method': 'POST',
	        'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
	        'headers': {
	            'Authorization': 'Key f3c1abe985594b70b378874adc2b8c42',
	            'Content-Type': 'application/json'
	        },
	        'data': data,
	       /* success: function (response) {
	           // console.log(response.outputs[0]);
				var ingredients = response.outputs[0].data.concepts;
	            var list = '';
	            for (var i =0;i < ingredients.length;i++) {
	                list += '<div class="ingredient">' + ingredients[i].name + '</div>'
	            }
	           // $('.ingredients').html(list);
	        },
	        error: function (xhr) {
	           // console.log(xhr);
	        } */
	    }).then(function (response) {
								var ingredients = response.data.outputs[0].data.concepts;
						for (var i =0;i < ingredients.length;i++) {
						$scope.ingredients.push(ingredients[i].name);
						}
    		// $('.ingredients').html(list);
    		console.log(list);
        }, function (xhr) {
        	console.log(xhr);
        })
	}

	$scope.restaurantId = $routeParams.id;
	var restaurants = [{
	name: 'Farzi Cafe',
	address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
	location: 'Connaught Place',
	category: 'Casual Dining, Bar',
	vote: '4.2',
	cuisines: 'Modern Indian',
	cost: '2200',
	hours: '12 Noon to 1 AM (Mon-Sun)',
		bestDish: {
	name: 'black coffee',
	image: 'data:image/jpeg;base64,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'
           },
 id:1,
	image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
},
{
	name: 'Dominos',
	address: '12/24, Level 1, Block A , Big Bazzar, Baddi',
	location: 'Baddi',
	category: 'Pizza',
	vote: '4.7',
	cuisines: 'Italian',
	cost: '500',
	hours: '12 Noon to 12 AM (Mon-Sun)',
 id :2,
 bestDish: {
	name: 'Corn Pizza',
	image: 'http://noblepig.com/images/2016/06/Avocado-and-Three-Bean-Salad-is-perfect-for-a-summertime-barbecue-side-dish.JPG'
           },
	image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt_2XFEpZvUI_wAMAqEnnWoVr61jAej6k4VgzwRr-yONk2Es-h'
},
{
	name: 'Silver Spoon Restaurant & Banquet Hall barnala',
	address: 'White Wave Building, Opposite DC Complex, Handiaya Road, Barnala, Punjab 148101',
	location: 'Connaught Place',
	category: 'Family Restaurant',
	vote: '3.9',
	cuisines: 'Indian',
	cost: '1000',
	hours: '8 AM to 11 PM (Mon-Sun)',
 id:3,
	image: 'http://lovethiscitytv.com/wp-content/uploads/2015/06/Top-25-New-Restaurants-in-Toronto2.jpeg'
},
{
	name: 'Pappu Dhaba',
	address: 'Old City, Bathinda, Punjab 151001',
	location: 'Bathinda',
	category: 'Casual Dining',
	vote: '4.3',
	cuisines: 'Indian',
	cost: '400',
	hours: '10 AM to 12 AM (Mon-Sun)',
 id :4,
	image: 'http://restaurant.business.brookes.ac.uk/images/slideshow/restaurant.jpg'
},
{
	name: 'Pizza Nation',
	address: ' Shop No. 25 A, City Center Complex, Patiala, Punjab 147001',
	location: 'Patiala',
	category: 'Pizza',
	vote: '4.4',
	cuisines: 'Italian',
	cost: '2200',
	hours: '11 AM to 11 PM (Mon-Sun)',
 id :5,
 bestDish: {
	name: 'Corn Pizza',
	image: 'http://noblepig.com/images/2016/06/Avocado-and-Three-Bean-Salad-is-perfect-for-a-summertime-barbecue-side-dish.JPG'
          },
	image: 'https://media.timeout.com/images/101564675/630/472/image.jpg'
}]
	$scope.restaurant = restaurants[$routeParams.id - 1];

})
//controller bnaya h....
foodieApp.controller('favController',function($scope,$location,$http) {


	$scope.ingredients = [];

//console.log($routeParams.id);

  $scope.restaurants = [{
							id: 1,
							bestDish: {
										name: 'Corn Pizza',
										image: 'https://images.food52.com/zyrGNL1_8ZxmJ43jtBLQoyLfNvA=/753x502/c947f605-2d61-4a10-9f69-abc7dda9fffb--DSC07406.JPG'
									},

	            image: 'https://images.food52.com/zyrGNL1_8ZxmJ43jtBLQoyLfNvA=/753x502/c947f605-2d61-4a10-9f69-abc7dda9fffb--DSC07406.JPG'
						},
						{

						id: 2,
						bestDish: {
									name: 'noodles',
									image: 'http://thewoksoflife.com/wp-content/uploads/2013/11/DSC_0178.jpg'
								},

            image: 'http://thewoksoflife.com/wp-content/uploads/2013/11/DSC_0178.jpg'
          },
          {
								id: 3,
								bestDish: {
											name: 'Italian Pasta',
											image: 'https://www.sensibus.com/deli/sites/sensibus.com/files/recipes/pasta-dish-2_0.jpg'
										},

                image: 'https://www.sensibus.com/deli/sites/sensibus.com/files/recipes/pasta-dish-2_0.jpg'
              },
              {

										id: 4,
										bestDish: {
													name: 'manchurian',
													image: 'https://i.ytimg.com/vi/MwqiyCl4DaM/maxresdefault.jpg'
												},

                    image: 'https://i.ytimg.com/vi/MwqiyCl4DaM/maxresdefault.jpg'
                    }]



						$scope.lists1 = [
						{'vl' : 'vegetable'},
						{'vl' : 'meat'},
						{'vl' : 'corn'},
						{'vl' : 'milk'},
						{'vl' : 'apple'},
					];
					$scope.lst1 = [];
					$scope.change1 = function(check,value){
								if(check){
										$scope.lst1.push(value);
								}else{
										 $scope.lst1.splice($scope.lst1.indexOf(value), 1);
								}
					};

					//
					$scope.lists2 = [
					{'vl' : 'almond'},
					{'vl' : 'egg'},
					{'vl' : 'onion'},
					{'vl' : 'lettuce'},
					{'vl' : 'banana'},
					];
					$scope.lst2 = [];
					$scope.change2 = function(check,value){
							if(check){
									$scope.lst2.push(value);
							}else{
									 $scope.lst2.splice($scope.lst2.indexOf(value), 1);
							}
					};


								$scope.getFav = function(url) {
						var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}'
										$http({
											'method': 'POST',
											'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
											'headers': {
												'Authorization': 'Key f3c1abe985594b70b378874adc2b8c42',
												'Content-Type': 'application/json'
											},
											'data': data,

										}).then(function (response) {
													var ingredients = response.data.outputs[0].data.concepts;
										  			var list = '';
														//  var cboxArray = [];
														for (var i =0;i < ingredients.length;i++) {
															$scope.ingredients.push(ingredients[i].name);
														}

														for(var i=0;i< $scope.lst1.length;i++){
													if ($scope.ingredients.indexOf($scope.lst1[i]) > -1) {

																if($scope.ingredients.indexOf($scope.lst2[i]) > -1){
																	// var info1 = "<h2 class='highlight-info'>You will not like this Food</h2>";
																  console.log("Not Your FAV");
																	$(".highlight-info").text('You may not like this Food');
																		 $(".rest-extra").css("background-color" ,"#ea0b0b");

																					break;
																}
																// var info2 = "<h2 class='highlight-info'>This is the food You May LIKE</h2>";
																console.log("Your FAV");
																$(".highlight-info").text(' You May LIKE This Food');
																	$(".rest-extra").css("background-color" ,"#308917");
																break;
															 }

															 else {
																//  var info1 = "<h2 class='highlight-info'>You will not like this Food</h2>";
																 console.log("Not Your FAV");
																	$(".highlight-info").text('You will not like this Food');
																	$(".rest-extra").css("background-color" ,"#ea0b0b");

															 }

									}


											//console.log(list);
										}, function (xhr) {
																	   console.log(xhr);
																	  });
																}




})

//--------------------------------------------mainController starts------------------------------------------------



foodieApp.controller('mainController',function($scope) {
	//what it will do.....
	$scope.restaurants = [{
	name: 'Farzi Cafe',
	address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
	location: 'Connaught Place',
	category: 'Casual Dining, Bar',
	vote: '4.2',
	cuisines: 'Modern Indian',
	cost: '2200',
	hours: '12 Noon to 1 AM (Mon-Sun)',
 id:1,
	image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
},
{
	name: 'Dominos',
	address: '12/24, Level 1, Block A , Big Bazzar, Baddi',
	location: 'Baddi',
	category: 'Pizza',
	vote: '4.7',
	cuisines: 'Italian',
	cost: '500',
	hours: '12 Noon to 12 AM (Mon-Sun)',
 id :2,
	image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt_2XFEpZvUI_wAMAqEnnWoVr61jAej6k4VgzwRr-yONk2Es-h'
},
{
	name: 'Silver Spoon Restaurant & Banquet Hall barnala',
	address: 'White Wave Building, Opposite DC Complex, Handiaya Road, Barnala, Punjab 148101',
	location: 'Connaught Place',
	category: 'Family Restaurant',
	vote: '3.9',
	cuisines: 'Indian',
	cost: '1000',
	hours: '8 AM to 11 PM (Mon-Sun)',
 id:3,
	image: 'http://lovethiscitytv.com/wp-content/uploads/2015/06/Top-25-New-Restaurants-in-Toronto2.jpeg'
},
{
	name: 'Pappu Dhaba',
	address: 'Old City, Bathinda, Punjab 151001',
	location: 'Bathinda',
	category: 'Casual Dining',
	vote: '4.3',
	cuisines: 'Indian',
	cost: '400',
	hours: '10 AM to 12 AM (Mon-Sun)',
 id :4,
	image: 'http://restaurant.business.brookes.ac.uk/images/slideshow/restaurant.jpg'
},
{
	name: 'Pizza Nation',
	address: ' Shop No. 25 A, City Center Complex, Patiala, Punjab 147001',
	location: 'Patiala',
	category: 'Pizza',
	vote: '4.4',
	cuisines: 'Italian',
	cost: '2200',
	hours: '11 AM to 11 PM (Mon-Sun)',
 id :5,
	image: 'https://media.timeout.com/images/101564675/630/472/image.jpg'
},
]

})
