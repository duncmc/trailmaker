/**
 * TrailMaker Main
 * -----
 * Author: Duncan McMillan
 *
 */
TrailMaker.module('Main', function(Main, App) {
	
	Main.controller;
	Main.router;
	
	Main.trail;
	Main.point;
	
	Main.map;
	Main.popup;
	Main.polyline;
	Main.default_zoom = 13;
	Main.default_center = [53.738666, -0.333152];
	
	/**
	 * Basemap Router
	 *
	 * Handles routes to show...?
	 */
	Main.Router = Marionette.AppRouter.extend({
		
		appRoutes: {
			''										: 'showIndex',
		//	'city-plan(/:stream_str)(/:subcat_str)'	: 'cityPlan',
			'*path'									: 'showPage'
		}
		
	});
	
	/**
	 * Main Controller
	 *
	 */
	Main.Controller = function(){
		
	};
	
	_.extend(Main.Controller.prototype, {
		
		/**
		 * Start
		 *
		 * 
		 */
		start: function(options){
			
			Main.trail = new App.Models.Trail();
			
			Main.trail.on('add', function(point, trail, e){
				var marker = L.marker(point.get('latlng'), { draggable:true }).addTo(App.Main.map);
				point.set('marker', marker);
			}).on('change', function(point, e){
				var trail_list_view = new App.Views.TrailPointListView({ collection:point.collection });
				App.points_list_region.show(trail_list_view);
				Main.controller.redrawPath();
			}).on('sort', function(trail, e){
				Main.controller.redrawPath();
			}).on('remove', function(model, trail, e){
				Main.map.removeLayer(model.get('marker'));
				Main.controller.redrawPath();
			});
			
			/*
			if (navigator.geolocation) {
				
				var success = function(geolocation) {
					var latlng = [geolocation.coords.latitude, geolocation.coords.longitude];
					Main.controller.centerMap(latlng);
				}
				
				var error = function() { console.log('Fail!'); }
				
				navigator.geolocation.getCurrentPosition(success, error, {timeout:10000});
			}
			*/
			this.initMap(options.el_id, options);
			
		},
		
		// -----------------------------------------
		// ROUTING METHODS
		// -----------------------------------------
		
		
		/**
		 * Show Page
		 *
		 * Fallback response to otherwise undefined routes.
		 */
		showPage: function(path) {
			
		},
		
		// -----------------------------------------
		
		/**
		 * Show 404
		 *
		 */
		show404: function() {
			alert('Oops! Whatever you were looking for isn’t here. Perhaps you should try something else…');
		},
		
		// -----------------------------------------
		// CONTENT DISPLAY METHODS
		// -----------------------------------------
		
		/** 
		 * Initialize map
		 *
		 */
		initMap: function(el_id, options){
			
			options.center = options.center || Main.default_center;
			options.zoom = options.zoom || Main.default_zoom;
			
			Main.map = L.map(el_id, options);
			
			L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
			    maxZoom: 18
			}).addTo(Main.map);
			
			Main.popup = L.popup();
			Main.polyline = L.polyline(Main.trail.pluck('latlng')).addTo(Main.map);
			
			Main.map.on('click', this.showLatLng, this);
		},
		
		/**
		 * Center Map
		 *
		 */
		centerMap: function(latlng, zoom){
			
			var zoom = zoom || this.default_zoom;
			
			Main.map.setView(latlng, zoom);
		},
		
		
		showLatLng: function(e){
			
			Main.point = new App.Models.Point({
				latlng: e.latlng,
				ordinal: Main.trail.length
			});
			
			var content = new App.Views.PointPopUpView({ model:Main.point }).render();
			
			Main.popup
				.setLatLng(e.latlng)
				.setContent(content.el)
				.openOn(Main.map);
		},
		
		redrawPath: function() {
			Main.polyline.setLatLngs(Main.trail.pluck('latlng'));
		},
		
		// -----------------------------------------
		// UTILITY METHODS
		// -----------------------------------------
		
	});
	
	/**
	 * Initializer
	 *
	 */
	Main.addInitializer(function(options){
		this.controller = new Main.Controller();
		this.controller.start(options);
	});
	
});
