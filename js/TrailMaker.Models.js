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
			
			this.attributes.latlng.lat = this.normalize(this.get('latlng').lat);
			this.attributes.latlng.lng = this.normalize(this.get('latlng').lng);
			
			this.on('change:marker', function(point, marker, e){
				
				var that = this;
				
				if (!this.previous('marker')) {
					marker.on('drag', function(e){
						var latlng = e.target.getLatLng();
						latlng.lat = that.normalize(latlng.lat);
						latlng.lng = that.normalize(latlng.lng);
						
						that.set('latlng', latlng);
					});
				}
				
			}).on('change:latlng', function(point, latlng, e){
				this.get('marker').setLatLng(this.get('latlng'));
			});
		},
		
		/**
		 *
		 *
		 */
		normalize: function(ordinate){
			
			ordinate = Math.round(ordinate * 100000) / 100000;
			ordinate = Math.min(ordinate, 180);
			ordinate = Math.max(ordinate, -180);
			
			return ordinate;
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