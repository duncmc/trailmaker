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
			console.log(this);
		},
		
		/**
		 * Lat
		 *
		 * Returns the point’s latitude to 6 decimal places
		 */
		lat: function(){
			return Math.floor(this.get('latlng').lat * 100000) / 100000;
		},
		
		/**
		 * Lng
		 *
		 * Returns the point’s longitude to 6 decimal places
		 */
		lng: function(){
			return Math.floor(this.get('latlng').lng * 100000) / 100000;
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