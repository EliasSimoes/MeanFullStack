
var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl', ['$scope', '$http', 
	function ($scope, $http) {
		console.log("Eu que mando aqui.");


//função para dar refresh assim que botao add adicionar o contato
	var refresh = function() {
		$http.get('/contactlist').success(function(response) {
			console.log("Eu peguei o dado requerido");
				$scope.contactlist = response;
				$scope.contact = "";
		});
	};

	refresh();

//botão add do index
	$scope.addContact = function(){

		console.log($scope.contact);
	//post request
			$http.post('/contactlist', $scope.contact).success(function (response) {
				console.log(response);
				refresh();
		});
	};

//botão remove
	$scope.remove = function(id){
		console.log(id);
			$http.delete('/contactlist/' + id).success(function (response) {
				refresh();
			});
	};

//botão editar
	$scope.edit = function(id){
		console.log(id);
			$http.get('/contactlist' + id).success(function (response) {
				$scope.contact = response;
			});
	};


//final do escopo principal
}]);
 
