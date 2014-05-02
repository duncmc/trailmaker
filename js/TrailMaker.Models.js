/**
 * TrailMaker Models
 * -----
 * Author: Duncan McMillan
 *
 */
TrailMaker.module('Models', function(Models, App) {
	
	/*
	 |----------------------------------------
	 | POINTS
	 |----------------------------------------
	 |
	 */
	
	/**
	 * Point (Model)
	 *
	 *
	 */
	Models.Point = Backbone.Model.extend({
		
		/**
		 * Initialize
		 *
		 */
		initialize: function(options){
		//	console.log(this);
		}
	});
	
	/**
	 * Trail (Point Collection)
	 *
	 *
	 */
	Models.Trail = Backbone.Collection.extend({
		
		model: Models.Point,
		comparator:'order',
		
		/**
		 * Initialize
		 *
		 */
		initialize: function(options){
			
		}
	});
});