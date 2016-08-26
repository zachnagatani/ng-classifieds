(function() {
	"use strict";
	
	ngClassifieds.controller('classifiedsCtrl',  ['$scope,' '$http', 'classifiedsFactory', '$mdSidenav', '$mdToast', '$mdDialog', '$state', '$location', function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog, $state, $location) {
		// var $scope = this;

		$scope.openSidebar = openSidebar;
		$scope.closeSidebar = closeSidebar;
		$scope.saveClassified = saveClassified;
		$scope.editClassified = editClassified;
		$scope.deleteClassified = deleteClassified;

		$scope.classifieds;
		$scope.categories;
		$scope.editing;
		$scope.classified;

		classifiedsFactory.getClassifieds()
			.then(function(classifieds) {
				$scope.classifieds = classifieds.data;
				$scope.categories = getCategories($scope.classifieds);
			});

		var contact = {
			name: 'Zach N',
			phone: "555555555",
			email: "zachnagatani@gmail.com"
		};

		function openSidebar() {
			$state.go('classifieds.new');
		};

		function closeSidebar() {
			$mdSidenav('left').close();
		};

		function showToast(message) {
			$mdToast.show(
					$mdToast.simple()
						.content(message)
						.position("top, right")
						.hideDelay(3000)
			);
		}

		function saveClassified(classified) {
			if(classified) {
				classified.contact = contact;
				$scope.classifieds.push(classified);
				$scope.classified = {};
				closeSidebar();
				showToast("Classified save!");
			}
		};

		function editClassified(classified) {
			$scope.editing = true;
			openSidebar();
			$scope.classified = classified;
		};

		function saveEdit() {
			$scope.editing = false;
			$scope.classified = {};
			closeSidebar();
			showToast("Edit saved!");
		};

		function deleteClassified(event, classified) {
			var confirm = $mdDialog.confirm()
				.title('Are you sure you want to delete ' + classified.title + '?')
				.ok('Yes')
				.cancel('No')
				.targetEvent(event);
			$mdDialog.show(confirm)
				.then(function() {
					var index = $scope.classifieds.indexOf(classified);
					$scope.classifieds.splice(index, 1);
				}, function() {

				});
		};

		function getCategories(classifieds) {
			var categories = [];

			angular.forEach(classifieds, function(item) {
				angular.forEach(item.categories, function(category){
					categories.push(category);
				});
			});

			return _.uniq(categories);
		};
	}]);
})();