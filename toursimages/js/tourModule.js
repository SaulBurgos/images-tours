'use strict';

/* Directives */
angular.module('toursModule', [])

.directive('toursCreator', function() {
	// Runs during compile
	return {
		scope: {
			scenes: '=scenes'
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'partials/fragments/toursCreator.html',
		replace: true,
		link: function(scope, iElm, iAttrs, controller) {
			scope.creatorHtml;
			scope.typeAreaSelected = '';
			scope.currentScene = {};
			scope.loadingScene = false;
			var imageSceneSelector = '.toursCreator-image';			

			scope.init = function () {
			   var jquiScript = document.createElement('script');
			   jquiScript.type = 'text/javascript';
			   jquiScript.async = true;
			   jquiScript.src = 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js';
			   var s = document.getElementsByTagName('script')[0];
			   s.parentNode.insertBefore(jquiScript, s);

			   var jquiStyle = document.createElement('link');
			   jquiStyle.rel = "stylesheet";
			   jquiStyle.href = "http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css";
			   var firstLink = document.getElementsByTagName('link')[0];
			   firstLink.parentNode.insertBefore(jquiStyle, firstLink);

				if(scope.scenes.length > 0) {
					scope.currentScene = scope.scenes[0];
				}
				scope.loadScene();
				scope.listenEvents();
			};

			scope.listenEvents = function() {

				var dragginOnProcess = false;
				var debounceTap = _.debounce(function(event) {

					if(!dragginOnProcess) {
						console.log('normal click');
					}

				},300);

				var debounceUnlockDrag = _.debounce(function() {
					dragginOnProcess = false;					
				}, 120);

				jQuery('body').on("touchstart click", ".js-hotspot", function (event) {
					event.preventDefault();
					debounceTap(event);
				});
	
				jQuery('body').on("touchmove",".js-hotspot",function (event) {
					event.preventDefault();
					dragginOnProcess = true;				
				});	
				
				jQuery('body').on("touchend touchcancel dragend", ".js-hotspot",function (event) {
					event.preventDefault();
					debounceUnlockDrag();
				});				
			}

			scope.changeScene = function (id) {				
				var found = scope.scenes.find(function(element){ return element.id == id });

				if(found) {
					scope.currentScene = found;
				}
				scope.loadScene();				
			};

			scope.loadScene = function() {				
				if(typeof scope.currentScene.url === 'undefined') {
					return;					
				}

				angular.element('#toursCreator .toursCreator-arrange').removeAttr('style');
				var sceneBackground = jQuery('.toursCreator-image');

				if(typeof scope.currentScene.url != 'undefined') {
					scope.loadingScene = true;
				}
			
				jQuery('.toursCreator-arrange').css({
					'height': '100%',
					'width': '100%'
				});
					
				jQuery(imageSceneSelector).removeClass('responsiveImage--portrait responsiveImage--landscape');
				jQuery(imageSceneSelector).load(scope.loadImageSuccess).error(function() {
					sceneBackground.attr('src','http://placehold.it/200x200&text=No+Image');
				}).attr('src', scope.currentScene.url);
				
			};

			scope.loadImageSuccess = _.debounce(function () {				
				scope.loadingScene = false;
				var height = jQuery(imageSceneSelector).height();
				var width = jQuery(imageSceneSelector).width();
				var cssAspectRatio;
				var ratio= width / height;
				var pratio= jQuery('.toursCreator-arrange').width() / jQuery('.toursCreator-arrange').parent().height();

				if (ratio<pratio) {
					cssAspectRatio = {
						width:'auto', 
						height:'100%'
					};
				} else {
					cssAspectRatio = { 
						width:'100%', 
						height:'auto'
					};
				} 

				jQuery(imageSceneSelector).css(cssAspectRatio);

				jQuery('.toursCreator-arrange').css({
					'height': jQuery(imageSceneSelector).css('height'),
					'width': jQuery(imageSceneSelector).css('width')
				});
				scope.$digest();

			},1000);

			scope.removeHotspot = function(index) {
				scope.currentScene.hotspots.splice(index,1);
			};

			scope.addHotspot = function(coord) {

				if(scope.typeAreaSelected != '' && typeof scope.currentScene.url !== 'undefined') {

					if(typeof scope.currentScene.hotspots === 'undefined') {
						scope.currentScene.hotspots = [];
					}

					if(typeof scope.currentScene.id === 'undefined') {
						scope.currentScene.id = new Date().getTime();
					}

					scope.currentScene.hotspots.push({
						id: 'hotspot' + new Date().getTime(),
						sceneId: scope.currentScene.id,
						name: _.uniqueId(scope.typeAreaSelected + '_'),
						type: scope.typeAreaSelected,
						targetAnchor: '',
						position: scope.getRandomPosition(),
						open: false						
					});
				}
			};

			scope.clickOnHotspot = function(currentHotspot,index) {
				
				if(currentHotspot.type == 'anchor') {
					scope.loadingScene = true;

					_.each(scope.scenes,function(element,index){
						if(element.id == currentHotspot.targetAnchor.id) {
							scope.changeScene(element.id);
						}
					});
				} else {
					
				}
			};

			

      	scope.setUpHotspot = function(hotspot) {
	 			angular.element('#toursCreator .toursCreator-hotspot').each(function( index ) {
			 		jQuery(this).resizable({
			 			containment: "parent",
        				stop: function(event) {
		         			scope.getUnitInPercentages();
        				}
			 		});

		 			jQuery(this).draggable({
			         	containment: "parent",
			         	scroll: false,
			         	stop: function() {
			         		scope.getUnitInPercentages();
	        			}
        			});
        			jQuery(this).css('cursor', 'move');			 		

			 		/*avoid propagation*/
        			jQuery(this).mousedown(function() {
        				return false
        			});

        			/*add random position to elements added to new elements to the array*/
        			if(!_.isUndefined(hotspot) && !_.has(hotspot, "position") ) {
        				hotspot.position = scope.getRandomPosition();
        			};
				});
	     	};

			scope.getRandomPosition = function() {
				var parent =  angular.element('#toursCreator .toursCreator-arrange');
				var parentHeight = parseFloat(parent.css('height'));
				var parentWidth = parseFloat(parent.css('width'));

				/* get top and left in percentages */
				var randomLeft = _.random(0, parentWidth);
				var leftPercentage = (randomLeft*100)/parentWidth;

				var randomTop = _.random(0, parentHeight);
				var topPercentage = (randomTop*100)/parentHeight;

				return {
					top: topPercentage + '%',
					left: leftPercentage + '%'
				};
			};

			scope.getUnitInPercentages = function() {
				var parent =  angular.element('#toursCreator .toursCreator-arrange');
				var parentHeight = parseFloat(parent.css('height'));
				var parentWidth = parseFloat(parent.css('width'));

				angular.element('#toursCreator .toursCreator-hotspot').each(function(index) {
					var currentElement = jQuery(this);
					var hotspotLeft = parseFloat(currentElement.css('left'));
					var hotspotTop = parseFloat(currentElement.css('top'));
					var hotspotWidth = parseFloat(currentElement.css('width'));
					var hotspotHeight = parseFloat(currentElement.css('height'));

					var leftPercentage = (hotspotLeft*100)/parentWidth;
					var topPercentage = (hotspotTop*100)/parentHeight;

					var widthPercentage = (hotspotWidth*100)/parentWidth;
					var heightPercentage = (hotspotHeight*100)/parentHeight;

					var hotspotFound = _.find(scope.currentScene.hotspots, function(element){
						return element.id == currentElement.attr('data-id');
					});

					hotspotFound.position = {
						'left': leftPercentage + '%',
						'top': topPercentage + '%',
						'width': widthPercentage + '%',
						'height': heightPercentage + '%'
					};

					currentElement.css({
						'left': leftPercentage + '%',
						'top': topPercentage + '%',
						'width': widthPercentage + '%',
						'height': heightPercentage + '%'
					});
				});
			};

	      scope.init();
		}
	};
})

.directive('toursAreas', function(){
	// Runs during compile
	return {
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		scope: {
			scenes: '=scenes',
			callbackNewScene: '=callbacknewscene',
			callbackAction: '=callbackaction'
		},
		templateUrl: 'partials/fragments/toursAreas.html',
		replace: true,
		// transclude: true,
		link: function(scope, iElm, iAttrs, controller) {
			scope.actualScene = {};
			scope.historyScenes = [];
			scope.backInprogress = false;
			scope.tourReady = false;
			var unregister;
			var containerTour = jQuery('#tourImages');

			scope.loadJqueryUi =  function() {
				var jquiScript = document.createElement('script');
			   jquiScript.type = 'text/javascript';
			   jquiScript.id = 'jqueryuiScript';
			   jquiScript.async = true;
			   jquiScript.src = 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js';

			   jquiScript.onload = function () {

				 	var jquiTouchScript = document.createElement('script');
				   jquiTouchScript.type = 'text/javascript';
				   jquiTouchScript.src = 'http://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js';
				   jquiTouchScript.onload = function () {
				   	jQuery('.tourArea-backButton').draggable({
				      	containment: '#tourImages',
				      	scroll: false
				  		});
				   }
				   //var s = document.getElementsByTagName('script')[0];
				   var s = document.getElementById('jqueryuiScript');
				   s.parentNode.insertBefore(jquiTouchScript, s);
			   };

			   var s = document.getElementsByTagName('script')[0];
			   s.parentNode.insertBefore(jquiScript, s);

			   var jquiStyle = document.createElement('link');
			   jquiStyle.rel = "stylesheet";
			   jquiStyle.href = "http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css";
			   var firstLink = document.getElementsByTagName('link')[0];
			   firstLink.parentNode.insertBefore(jquiStyle, firstLink);
			}

			scope.init = function() {
				scope.actualScene = scope.scenes[0];
				scope.loadJqueryUi();
				scope.tourReady = true;
				containerTour.css(
					'background-image',
					'url(' + scope.actualScene.url + ')'
				);
				
				if(!_.isUndefined(scope.callbackNewScene)) {
					scope.callbackNewScene(scope.actualScene,0);
				}	
			};

			scope.changeScene = function (id, skipHistory) {
				_.each(scope.scenes,function(element, index ){ 						
					if(element.id == id) {
						if (!skipHistory){
							scope.historyScenes.push(scope.actualScene.id);
						}				
						scope.actualScene = _.clone(scope.scenes[index]);

						if(!_.isUndefined(scope.callbackNewScene)) {
							scope.callbackNewScene(scope.actualScene, index);
						}

						containerTour.css(
							'background-image',
							'url(' + scope.actualScene.url + ')'
						);
					} 
				});
				scope.backInprogress = false;
			};

			scope.clickOnArea = function(currentHotspot,index) {
				if(currentHotspot.type == 'anchor') {
					_.each(scope.scenes,function(element,index){
						if(element.id == currentHotspot.targetAnchor.id) {
							scope.changeScene(element.id);
						}
					});						
				} else {
					if(!_.isUndefined(scope.callbackAction)) {
						scope.callbackAction(currentHotspot,index);
					}
				}
			};

			scope.backPreviousScene = function() {
				scope.backInprogress = true;
				var previousId = scope.historyScenes.pop();
				if(!_.isUndefined(previousId)) {
					scope.changeScene(previousId, true);			
				}
			};

			unregister = scope.$watchCollection('scenes', function(newValue, oldValue) {
				if(angular.isArray(newValue)) {
					if(newValue.length > 0) {
						scope.init();
						unregister();
					}	
				}					
			});
		}
	};
});