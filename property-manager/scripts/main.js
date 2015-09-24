'use strict';

define(['jquery', 
	'utilities/parser', 
	'utilities/registry', 
	'utilities/router',
	'widgets/form/form', 
	'widgets/viewProperty', 
	'widgets/viewAllProperties'], 
	function($, parser, registry, router, form, viewProperty, viewAllProperties){

	var view = $('#viewContainer');

	parser.parse(function(){
		//any custom JS to run on registry's items
	});

	router.route('/add', function(){
		//show the add view
		form.populateForm().then(function(){
			parser.parse(null, view);
		});
	});

	router.route('/added', function(){
		//confirm property has been added and display it
		var viewPropertyObj = new viewProperty();
		viewPropertyObj.viewProperty();
	});


	router.route('/viewAllProperties', function(){
		//show all the properties added so far
		var viewAllPropertiesObj = new viewAllProperties();
		viewAllPropertiesObj.viewAllProperties();
	});

	router.start();
});