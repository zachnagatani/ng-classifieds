var ngClassifieds = angular.module("ngClassifieds", ["ngMaterial", "ui.router"]);

ngClassifieds.config(function($mdThemingProvider, $stateProvider){
	$mdThemingProvider.theme("default")
		.primaryPalette("teal")
		.accentPalette("orange");

		$stateProvider
			.state("classifieds", {
				url: "/classifieds",
				templateUrl: 'components/classifieds/classifieds.tpl.html',
				controller: 'classifiedsCtrl as vm'
			})
			.state("classifieds.new", {
				url: "/new",
				templateUrl: 'components/classifieds/new/classifieds.new.tpl.html',
				controller: 'newClassifiedsCtrl as vm'
			})
});

ngClassifieds.directive("helloWorld", function() {
	return {
		template: "<h1>{{name.firstName}}</h1>"
	}
});