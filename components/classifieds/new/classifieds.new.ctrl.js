(function() {
	"use strict";
		
		ngClassifieds.controller('newClassifiedsCtrl',['$mdSidenav', '$mdDialog', 'classifiedsFactory', function($mdSidenav, $mdDialog, classifiedsFactory){
			var self = this;
			$mdSidenav('left').open();
		}]);
})();