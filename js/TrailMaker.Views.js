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
		
		templateHelpers: {
			lat: function(){
				return this.latlng.lat;
			},
			lng: function(){
				return this.latlng.lng;
			}
		},
		
		events: {
			'click button.delete': function(){
				this.model.collection.remove(this.model);
			},
			'click button.edit': function(){
				this.makeEditable(true);
			},
			'click button.cancel': function(){
				this.makeEditable(false);
			},
			'keyup input': function(e){
				if (e.keyCode == 13){
					
					var contents = $(e.currentTarget).val().split(',');
					
					if (contents.length != 2) {
						return alert('Lat/Long coordinates are invalid');
					}
					
					var lat = Number(contents[0].trim());
					var lng = Number(contents[1].trim());
					
					if (_.isNaN(lat) || _.isNaN(lng)) {
						return alert('Lat/Long coordinates are invalid');
					}
					
					var latlng = { lat:lat, lng:lng };
					
					this.model.set('latlng', latlng);
				}
			}
		},
		
		template: '#template-point-list-item',
		tagName:'li',
		className:'point',
		
		makeEditable: function(really){
			if (really) {
				var content = this.model.get('latlng').lat + ', ' + this.model.get('latlng').lng;
				this.$el.find('.latlng').html('<input type="text" value="' + content + '">');
				this.$el.find('button.edit').addClass('hidden');
			} else {
				this.render();
			}
		}
	});
	
	/**
	 * Point PopUp View (Item View)
	 *
	 *
	 */
	Views.PointPopUpView = Backbone.Marionette.ItemView.extend({
		
		templateHelpers: {
			lat: function(){
				return this.latlng.lat;
			},
			lng: function(){
				return this.latlng.lng;
			}
		},
		
		events: {
			'click button.add-point': function(){
				App.Main.map.closePopup();
				App.Main.trail.add(this.model);
			}
		},
		
		template: '#template-point-popup',
		tagName:'div'
		
	});
	
	
	/**
	 * Trail Point List View (Collection View)
	 *
	 *
	 */
	Views.TrailPointListView = Backbone.Marionette.CollectionView.extend({
		
	//	template: '#template-trail-point-list',
		tagName: 'ol',
		itemView: Views.PointListItemView,
		
		events: {
			'sortupdate':function(e, ui) {
				this.children.each(function(view){
					view.model.attributes.ordinal = view.$el.index();
				});
				
				this.collection.sort();
			}
		},
		
		onRender:function(){
			this.$el.sortable();
		}
	});
	
	/**
	 * Add Point View (View)
	 *
	 *
	 */
	Views.AddPointView = Backbone.View.extend({
		
		events: {
			'submit':function(e){
				e.preventDefault();
				var lat = this.$el.find('input#input-lat').val().trim();
				var lng = this.$el.find('input#input-lng').val().trim();
				
				if (_.isNaN(Number(lat)) || _.isNaN(Number(lng)) || lat == '' || lng == '') {
					return alert('Lat/Long coordinates are invalid');
				}
				
				var options = {
					latlng: { lat:lat, lng:lng },
					ordinal: this.trail.length
				};
				
				this.trail.add(options);
			}
		},
		
		initialize: function(options) {
			this.trail = options.trail;
		}
		
	});
});