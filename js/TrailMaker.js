/**
 * TrailMaker
 * -----
 * Author: Duncan McMillan
 *
 *
 */
var TrailMaker = new Backbone.Marionette.Application();

TrailMaker.addRegions({
});

TrailMaker.on('initialize:after', function () {
	Backbone.history.start();
});