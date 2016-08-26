(function() {
	"use strict";

	ngClassifieds.factory("classifiedsFactory", ['$http', function($http) {
		function getClassifieds(url) {
			return $http.get('data/classifieds.json');
		}

		return {
			getClassifieds: getClassifieds
		}
	}]);
})();