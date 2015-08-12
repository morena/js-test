define(["jquery"], function($){
	
	function supports_history_api() {
	  return !!(window.history && history.pushState);
	}

	router = {

		clickManager: function(link, callback, popStateCallback){
			if(supports_history_api() === true){
				history.pushState(null, null, link);
				if(typeof callback === 'function'){
					callback();
				}
			}
		}
		/*$(window).on('hashchange', function(){
		    if(window.location.hash.match(/^\/add$/)){
		      //this is my '/add' route
		    }
		});*/
	};

	return router;
})


