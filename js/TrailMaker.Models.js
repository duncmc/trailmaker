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
			
			this.attributes.latlng.lat = Math.floor(this.get('latlng').lat * 100000) / 100000;
			this.attributes.latlng.lng = Math.floor(this.get('latlng').lng * 100000) / 100000;
			
			this.on('change:marker', function(point, marker, e){
				
				var that = this;
				
				if (!this.previous('marker')) {
					marker.on('drag', function(e){
						var latlng = e.target.getLatLng();
						
						latlng.lat = Math.floor(latlng.lat * 100000) / 100000;
						latlng.lng = Math.floor(latlng.lng * 100000) / 100000;
						
						that.set('latlng', latlng);
					});
				}
				
			}).on('change:latlng', function(point, latlng, e){
				this.get('marker').setLatLng(this.get('latlng'));//.update();
			});
		}
	});
	
	/**
	 * Trail (Point Collection)
	 *
	 *
	 */
	Models.Trail = Backbone.Collection.extend({
		
		model: Models.Point,
		comparator:'ordinal',
		
		/**
		 * Initialize
		 *
		 */
		initialize: function(options){
			
		}
	});
});