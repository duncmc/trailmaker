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
	
	Main.popup;
	Main.map;
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
			
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(geolocation) {
					var latlng = [geolocation.coords.latitude, geolocation.coords.longitude];
					this.centerMap(latlng);
				});
			}
			
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
			Main.popup = L.popup();
			
			L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
			    maxZoom: 18
			}).addTo(Main.map);
			
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
			
			var point = new App.Models.Point({
				latlng: e.latlng,
				order: Main.trail.length
			});
			
			var content = new App.Views.PointPopUpView(point).render();
			console.log(content);
			/*
			Main.popup
				.setLatLng(e.latlng)
				.setContent(content)
				.openOn(Main.map);
			*/
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
