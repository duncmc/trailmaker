/**
 * TrailMaker Views
 * -----
 * Author: Duncan McMillan
 *
 */
TrailMaker.module('Views', function(Views, App) {
	
	/**
	 * Point List Item View (Item View)
	 *
	 *
	 */
	Views.PointListItemView = Backbone.Marionette.ItemView.extend({
		
		template: '#template-point-list-item',
		tagName:'li',
		className:'point',
		
	});
	
	/**
	 * Point PopUp View (Item View)
	 *
	 *
	 */
	Views.PointPopUpView = Backbone.Marionette.ItemView.extend({
		
		template: '#template-point-popup',
		tagName:'div'
		
	});
	
	
	/**
	 * Trail Point List View (Collection View)
	 *
	 *
	 */
	Views.TrailPointListView = Backbone.Marionette.CompositeView.extend({
		
		template: '#template-trail-point-list',
		tagName: 'section',
		itemView: Views.PointListItemView,
		itemViewContainer: 'ol',
		
	});
});