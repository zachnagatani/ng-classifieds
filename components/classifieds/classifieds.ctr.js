(function() {
	"use strict";
	
	ngClassifieds.controller('classifiedsCtrl',  ['$http', 'classifiedsFactory', '$mdSidenav', '$mdToast', '$mdDialog', function($http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
		var self = this;

		self.openSidebar = openSidebar;
		self.closeSidebar = closeSidebar;
		self.saveClassified = saveClassified;
		self.editClassified = editClassified;
		self.deleteClassified = deleteClassified;

		self.classifieds;
		self.categories;
		self.editing;
		self.classified;

		classifiedsFactory.getClassifieds()
			.then(function(classifieds) {
				self.classifieds = classifieds.data;
				self.categories = getCategories(self.classifieds);
			});

		var contact = {
			name: 'Zach N',
			phone: "555555555",
			email: "zachnagatani@gmail.com"
		};

		function openSidebar() {
			$mdSidenav('left').open();
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
				self.classifieds.push(classified);
				self.classified = {};
				closeSidebar();
				showToast("Classified save!");
			}
		};

		function editClassified(classified) {
			self.editing = true;
			openSidebar();
			self.classified = classified;
		};

		function saveEdit() {
			self.editing = false;
			self.classified = {};
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
					var index = self.classifieds.indexOf(classified);
					self.classifieds.splice(index, 1);
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