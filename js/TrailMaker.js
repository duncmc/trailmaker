/**
 * TrailMaker
 * -----
 * Author: Duncan McMillan
 *
 *
 */
var TrailMaker = new Backbone.Marionette.Application();

TrailMaker.addRegions({
	points_list_region:'#trail-points-list'
});

TrailMaker.on('initialize:after', function () {
	Backbone.history.start();
});