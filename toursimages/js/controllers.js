'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

.controller('MyCtrl1', ['$scope','$q',function($scope,$q) {

	$scope.amountScenes = 8;
	$scope.steps = {
		step1: {
			show: true
		},
		step2: {
			show: false
		},
		step3: {
			show: false
		}
	};

	$scope.scenes = [];

	$scope.goToStep = function(stepToGo) {

		switch (stepToGo) {
			case 1:
				$scope.steps.step1.show = true;
				$scope.steps.step2.show = false;
				$scope.steps.step2.show = false;
				break;
			case 2:
				$scope.steps.step1.show = false;
				$scope.steps.step2.show = true;
				$scope.steps.step2.show = true;
				break;

			case 3:
				$scope.steps.step1.show = false;
				$scope.steps.step2.show = true;
				$scope.steps.step2.show = true;
				break;
		}

	};

	// $scope.scenes = [
	// 	{name: 'scene 1',url:'http://saulburgos.com/apps/toursimages/img/tours-1.jpg'},
	// 	{name: 'scene 2',url:'http://saulburgos.com/apps/toursimages/img/tours-2.jpg'},
	// 	{name: 'scene 3',url:'http://saulburgos.com/apps/toursimages/img/tours-3.jpg'},
	// 	{name: 'scene 4',url:'http://saulburgos.com/apps/toursimages/img/tours-4.jpg'},
	// 	{name: 'scene 5',url:'http://saulburgos.com/apps/toursimages/img/tours-5.jpg'},
	// 	{name: 'scene 6',url:'http://saulburgos.com/apps/toursimages/img/tours-6.jpg'},
	// 	{name: 'scene 7',url:'http://saulburgos.com/apps/toursimages/img/tours-7.jpg'},
	// 	{name: 'scene 8',url:'http://saulburgos.com/apps/toursimages/img/tours-8.jpg'},
	// 	{name: 'scene 9',url:'http://saulburgos.com/apps/toursimages/img/tours-9.jpg'}
	// ];


	$scope.showJson = function() {
		$scope.finalObject = angular.toJson($scope.scenes);
	};	

	function readImageFile (file) {
		var defer = $q.defer();
		var fileReader = new FileReader();

		jQuery('#msgLoadingImages').append('<div> Loading... ' + file.name + '</div>' );

		fileReader.onload = function(fileLoadedEvent) {
			var img = new Image();
			img.crossOrigin = 'Anonymous';
			img.className = 'imageTourPreviewThumb img-responsive img-thumbnail';
			img.onload = function() {               
				defer.resolve({
					image: this,
					data: fileReader.result
				});
			};
			img.src = fileReader.result;
		};

		fileReader.onprogress = function(event) {};

		fileReader.readAsDataURL(file);
		return defer.promise;
	}

	$scope.processFiles = function() {
		var imagesPromises = [];
		var filesSelected = document.getElementById("imagesTour").files;

      if (filesSelected.length > 0) {

			_.each(filesSelected,function(currentFile) {

				imagesPromises.push(readImageFile(currentFile));
			});
		}

		$q.all(imagesPromises).then(function(info) {
			$scope.scenes = [];
			jQuery('#msgLoadingImages').empty();
			
			info.forEach(function(element,index) {
				document.querySelector('.imagePreviewContainer').appendChild(element.image);
				$scope.scenes.push({
					name: 'scene' + (index + 1),
					image: element.image,
					url: element.data
				});
			});			
		});
	};

	//only to update the array of scenes
	$scope.updateScenesToUse =  function() {
		var newScenes = new Array($scope.amountScenes);
		for (var i = 0; i < newScenes.length; i++) {
			newScenes[i] = {name: 'scene ' + (i + 1),url:''};
		};
		$scope.scenes = newScenes;
	}

	$scope.$on('$viewContentLoaded', function() {
   	
	});

}])

.controller('MyCtrl2', function($scope) {

	var scenesJson = '[{"name":"scene 1","url":"http://saulburgos.com/apps/toursimages/img/tours-1.jpg","hotspots":[{"id":"hotspot1415997708159","sceneId":1415997707687,"name":"anchor_2","type":"anchor","targetAnchor":{"name":"scene 2","url":"http://saulburgos.com/apps/toursimages/img/tours-2.jpg","hotspots":[{"id":"hotspot1415997718031","sceneId":1415997718031,"name":"anchor_4","type":"anchor","targetAnchor":{"name":"scene 3","url":"http://saulburgos.com/apps/toursimages/img/tours-3.jpg","hotspots":[{"id":"hotspot1415997728526","sceneId":1415997728526,"name":"anchor_6","type":"anchor","targetAnchor":{"name":"scene 6","url":"http://saulburgos.com/apps/toursimages/img/tours-6.jpg","hotspots":[{"id":"hotspot1415997741623","sceneId":1415997741623,"name":"anchor_9","type":"anchor","targetAnchor":{"name":"scene 7","url":"http://saulburgos.com/apps/toursimages/img/tours-7.jpg","hotspots":[{"id":"hotspot1415997853342","sceneId":1415997853342,"name":"action_16","type":"action","targetAnchor":"","targetAction":"","position":{"left":"19.295558958652375%","top":"8.285714285714286%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997853757","sceneId":1415997853342,"name":"action_17","type":"action","targetAnchor":"","targetAction":"","position":{"left":"73.96630934150076%","top":"62%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997856741","sceneId":1415997853342,"name":"action_18","type":"action","targetAnchor":"","targetAction":"","position":{"left":"30.93415007656968%","top":"65.14285714285714%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997853342},"targetAction":"","position":{"left":"54.82149693721286%","top":"58.57142857142857%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997742126","sceneId":1415997741623,"name":"anchor_10","type":"anchor","targetAnchor":{"name":"scene 8","url":"http://saulburgos.com/apps/toursimages/img/tours-8.jpg","hotspots":[{"id":"hotspot1415997844585","sceneId":1415997844585,"name":"action_14","type":"action","targetAnchor":"","targetAction":"","position":{"left":"69.8291539050536%","top":"43.424107142857146%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997845197","sceneId":1415997844585,"name":"action_15","type":"action","targetAnchor":"","targetAction":"","position":{"left":"16.079632465543646%","top":"59.42857142857143%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997844585},"targetAction":"","position":{"left":"4.594180704441041%","top":"66%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997741623},"targetAction":"","position":{"left":"47.626339969372125%","top":"68.85714285714286%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997728526},"targetAction":"","position":{"left":"45.78866768759571%","top":"58%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997722318","sceneId":1415997718031,"name":"anchor_5","type":"anchor","targetAnchor":{"name":"scene 4","url":"http://saulburgos.com/apps/toursimages/img/tours-4.jpg","hotspots":[{"id":"hotspot1415997732791","sceneId":1415997732791,"name":"anchor_7","type":"anchor","targetAnchor":{"name":"scene 5","url":"http://saulburgos.com/apps/toursimages/img/tours-5.jpg","hotspots":[{"id":"hotspot1415997736991","sceneId":1415997736991,"name":"anchor_8","type":"anchor","targetAnchor":{"name":"scene 9","url":"http://saulburgos.com/apps/toursimages/img/tours-9.jpg","hotspots":[{"id":"hotspot1415997833789","sceneId":1415997833789,"name":"action_11","type":"action","targetAnchor":"","targetAction":"","position":{"left":"15.313935681470138%","top":"34.857142857142854%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997836710","sceneId":1415997833789,"name":"action_12","type":"action","targetAnchor":"","targetAction":"","position":{"left":"69.67840735068913%","top":"33.142857142857146%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997839054","sceneId":1415997833789,"name":"action_13","type":"action","targetAnchor":"","targetAction":"","position":{"left":"42.11332312404288%","top":"73.42857142857143%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997833789},"targetAction":"","position":{"left":"53.751914241960186%","top":"51.42857142857143%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997736991},"targetAction":"","position":{"left":"34.30321592649311%","top":"66.57142857142857%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997732791},"targetAction":"","position":{"left":"4.134762633996937%","top":"48.285714285714285%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997718031},"targetAction":"","position":{"left":"72.43491577335375%","top":"56.57142857142857%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997709951","sceneId":1415997707687,"name":"anchor_3","type":"anchor","targetAnchor":{"name":"scene 4","url":"http://saulburgos.com/apps/toursimages/img/tours-4.jpg","hotspots":[{"id":"hotspot1415997732791","sceneId":1415997732791,"name":"anchor_7","type":"anchor","targetAnchor":{"name":"scene 5","url":"http://saulburgos.com/apps/toursimages/img/tours-5.jpg","hotspots":[{"id":"hotspot1415997736991","sceneId":1415997736991,"name":"anchor_8","type":"anchor","targetAnchor":{"name":"scene 9","url":"http://saulburgos.com/apps/toursimages/img/tours-9.jpg","hotspots":[{"id":"hotspot1415997833789","sceneId":1415997833789,"name":"action_11","type":"action","targetAnchor":"","targetAction":"","position":{"left":"15.313935681470138%","top":"34.857142857142854%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997836710","sceneId":1415997833789,"name":"action_12","type":"action","targetAnchor":"","targetAction":"","position":{"left":"69.67840735068913%","top":"33.142857142857146%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997839054","sceneId":1415997833789,"name":"action_13","type":"action","targetAnchor":"","targetAction":"","position":{"left":"42.11332312404288%","top":"73.42857142857143%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997833789},"targetAction":"","position":{"left":"53.751914241960186%","top":"51.42857142857143%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997736991},"targetAction":"","position":{"left":"34.30321592649311%","top":"66.57142857142857%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997732791},"targetAction":"","position":{"left":"31.699846860643184%","top":"42.285714285714285%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997707687},{"name":"scene 2","url":"http://saulburgos.com/apps/toursimages/img/tours-2.jpg","hotspots":[{"id":"hotspot1415997718031","sceneId":1415997718031,"name":"anchor_4","type":"anchor","targetAnchor":{"name":"scene 3","url":"http://saulburgos.com/apps/toursimages/img/tours-3.jpg","hotspots":[{"id":"hotspot1415997728526","sceneId":1415997728526,"name":"anchor_6","type":"anchor","targetAnchor":{"name":"scene 6","url":"http://saulburgos.com/apps/toursimages/img/tours-6.jpg","hotspots":[{"id":"hotspot1415997741623","sceneId":1415997741623,"name":"anchor_9","type":"anchor","targetAnchor":{"name":"scene 7","url":"http://saulburgos.com/apps/toursimages/img/tours-7.jpg","hotspots":[{"id":"hotspot1415997853342","sceneId":1415997853342,"name":"action_16","type":"action","targetAnchor":"","targetAction":"","position":{"left":"19.295558958652375%","top":"8.285714285714286%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997853757","sceneId":1415997853342,"name":"action_17","type":"action","targetAnchor":"","targetAction":"","position":{"left":"73.96630934150076%","top":"62%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997856741","sceneId":1415997853342,"name":"action_18","type":"action","targetAnchor":"","targetAction":"","position":{"left":"30.93415007656968%","top":"65.14285714285714%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997853342},"targetAction":"","position":{"left":"54.82149693721286%","top":"58.57142857142857%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997742126","sceneId":1415997741623,"name":"anchor_10","type":"anchor","targetAnchor":{"name":"scene 8","url":"http://saulburgos.com/apps/toursimages/img/tours-8.jpg","hotspots":[{"id":"hotspot1415997844585","sceneId":1415997844585,"name":"action_14","type":"action","targetAnchor":"","targetAction":"","position":{"left":"69.8291539050536%","top":"43.424107142857146%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997845197","sceneId":1415997844585,"name":"action_15","type":"action","targetAnchor":"","targetAction":"","position":{"left":"16.079632465543646%","top":"59.42857142857143%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997844585},"targetAction":"","position":{"left":"4.594180704441041%","top":"66%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997741623},"targetAction":"","position":{"left":"47.626339969372125%","top":"68.85714285714286%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997728526},"targetAction":"","position":{"left":"45.78866768759571%","top":"58%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997722318","sceneId":1415997718031,"name":"anchor_5","type":"anchor","targetAnchor":{"name":"scene 4","url":"http://saulburgos.com/apps/toursimages/img/tours-4.jpg","hotspots":[{"id":"hotspot1415997732791","sceneId":1415997732791,"name":"anchor_7","type":"anchor","targetAnchor":{"name":"scene 5","url":"http://saulburgos.com/apps/toursimages/img/tours-5.jpg","hotspots":[{"id":"hotspot1415997736991","sceneId":1415997736991,"name":"anchor_8","type":"anchor","targetAnchor":{"name":"scene 9","url":"http://saulburgos.com/apps/toursimages/img/tours-9.jpg","hotspots":[{"id":"hotspot1415997833789","sceneId":1415997833789,"name":"action_11","type":"action","targetAnchor":"","targetAction":"","position":{"left":"15.313935681470138%","top":"34.857142857142854%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997836710","sceneId":1415997833789,"name":"action_12","type":"action","targetAnchor":"","targetAction":"","position":{"left":"69.67840735068913%","top":"33.142857142857146%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997839054","sceneId":1415997833789,"name":"action_13","type":"action","targetAnchor":"","targetAction":"","position":{"left":"42.11332312404288%","top":"73.42857142857143%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997833789},"targetAction":"","position":{"left":"53.751914241960186%","top":"51.42857142857143%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997736991},"targetAction":"","position":{"left":"34.30321592649311%","top":"66.57142857142857%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997732791},"targetAction":"","position":{"left":"4.134762633996937%","top":"48.285714285714285%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997718031},{"name":"scene 3","url":"http://saulburgos.com/apps/toursimages/img/tours-3.jpg","hotspots":[{"id":"hotspot1415997728526","sceneId":1415997728526,"name":"anchor_6","type":"anchor","targetAnchor":{"name":"scene 6","url":"http://saulburgos.com/apps/toursimages/img/tours-6.jpg","hotspots":[{"id":"hotspot1415997741623","sceneId":1415997741623,"name":"anchor_9","type":"anchor","targetAnchor":{"name":"scene 7","url":"http://saulburgos.com/apps/toursimages/img/tours-7.jpg","hotspots":[{"id":"hotspot1415997853342","sceneId":1415997853342,"name":"action_16","type":"action","targetAnchor":"","targetAction":"","position":{"left":"19.295558958652375%","top":"8.285714285714286%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997853757","sceneId":1415997853342,"name":"action_17","type":"action","targetAnchor":"","targetAction":"","position":{"left":"73.96630934150076%","top":"62%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997856741","sceneId":1415997853342,"name":"action_18","type":"action","targetAnchor":"","targetAction":"","position":{"left":"30.93415007656968%","top":"65.14285714285714%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997853342},"targetAction":"","position":{"left":"54.82149693721286%","top":"58.57142857142857%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997742126","sceneId":1415997741623,"name":"anchor_10","type":"anchor","targetAnchor":{"name":"scene 8","url":"http://saulburgos.com/apps/toursimages/img/tours-8.jpg","hotspots":[{"id":"hotspot1415997844585","sceneId":1415997844585,"name":"action_14","type":"action","targetAnchor":"","targetAction":"","position":{"left":"69.8291539050536%","top":"43.424107142857146%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997845197","sceneId":1415997844585,"name":"action_15","type":"action","targetAnchor":"","targetAction":"","position":{"left":"16.079632465543646%","top":"59.42857142857143%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997844585},"targetAction":"","position":{"left":"4.594180704441041%","top":"66%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997741623},"targetAction":"","position":{"left":"47.626339969372125%","top":"68.85714285714286%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997728526},{"name":"scene 4","url":"http://saulburgos.com/apps/toursimages/img/tours-4.jpg","hotspots":[{"id":"hotspot1415997732791","sceneId":1415997732791,"name":"anchor_7","type":"anchor","targetAnchor":{"name":"scene 5","url":"http://saulburgos.com/apps/toursimages/img/tours-5.jpg","hotspots":[{"id":"hotspot1415997736991","sceneId":1415997736991,"name":"anchor_8","type":"anchor","targetAnchor":{"name":"scene 9","url":"http://saulburgos.com/apps/toursimages/img/tours-9.jpg","hotspots":[{"id":"hotspot1415997833789","sceneId":1415997833789,"name":"action_11","type":"action","targetAnchor":"","targetAction":"","position":{"left":"15.313935681470138%","top":"34.857142857142854%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997836710","sceneId":1415997833789,"name":"action_12","type":"action","targetAnchor":"","targetAction":"","position":{"left":"69.67840735068913%","top":"33.142857142857146%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997839054","sceneId":1415997833789,"name":"action_13","type":"action","targetAnchor":"","targetAction":"","position":{"left":"42.11332312404288%","top":"73.42857142857143%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997833789},"targetAction":"","position":{"left":"53.751914241960186%","top":"51.42857142857143%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997736991},"targetAction":"","position":{"left":"34.30321592649311%","top":"66.57142857142857%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997732791},{"name":"scene 5","url":"http://saulburgos.com/apps/toursimages/img/tours-5.jpg","hotspots":[{"id":"hotspot1415997736991","sceneId":1415997736991,"name":"anchor_8","type":"anchor","targetAnchor":{"name":"scene 9","url":"http://saulburgos.com/apps/toursimages/img/tours-9.jpg","hotspots":[{"id":"hotspot1415997833789","sceneId":1415997833789,"name":"action_11","type":"action","targetAnchor":"","targetAction":"","position":{"left":"15.313935681470138%","top":"34.857142857142854%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997836710","sceneId":1415997833789,"name":"action_12","type":"action","targetAnchor":"","targetAction":"","position":{"left":"69.67840735068913%","top":"33.142857142857146%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997839054","sceneId":1415997833789,"name":"action_13","type":"action","targetAnchor":"","targetAction":"","position":{"left":"42.11332312404288%","top":"73.42857142857143%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997833789},"targetAction":"","position":{"left":"53.751914241960186%","top":"51.42857142857143%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997736991},{"name":"scene 6","url":"http://saulburgos.com/apps/toursimages/img/tours-6.jpg","hotspots":[{"id":"hotspot1415997741623","sceneId":1415997741623,"name":"anchor_9","type":"anchor","targetAnchor":{"name":"scene 7","url":"http://saulburgos.com/apps/toursimages/img/tours-7.jpg","hotspots":[{"id":"hotspot1415997853342","sceneId":1415997853342,"name":"action_16","type":"action","targetAnchor":"","targetAction":"","position":{"left":"19.295558958652375%","top":"8.285714285714286%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997853757","sceneId":1415997853342,"name":"action_17","type":"action","targetAnchor":"","targetAction":"","position":{"left":"73.96630934150076%","top":"62%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997856741","sceneId":1415997853342,"name":"action_18","type":"action","targetAnchor":"","targetAction":"","position":{"left":"30.93415007656968%","top":"65.14285714285714%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997853342},"targetAction":"","position":{"left":"54.82149693721286%","top":"58.57142857142857%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997742126","sceneId":1415997741623,"name":"anchor_10","type":"anchor","targetAnchor":{"name":"scene 8","url":"http://saulburgos.com/apps/toursimages/img/tours-8.jpg","hotspots":[{"id":"hotspot1415997844585","sceneId":1415997844585,"name":"action_14","type":"action","targetAnchor":"","targetAction":"","position":{"left":"69.8291539050536%","top":"43.424107142857146%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997845197","sceneId":1415997844585,"name":"action_15","type":"action","targetAnchor":"","targetAction":"","position":{"left":"16.079632465543646%","top":"59.42857142857143%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997844585},"targetAction":"","position":{"left":"4.594180704441041%","top":"66%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997741623},{"name":"scene 7","url":"http://saulburgos.com/apps/toursimages/img/tours-7.jpg","hotspots":[{"id":"hotspot1415997853342","sceneId":1415997853342,"name":"action_16","type":"action","targetAnchor":"","targetAction":"","position":{"left":"19.295558958652375%","top":"8.285714285714286%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997853757","sceneId":1415997853342,"name":"action_17","type":"action","targetAnchor":"","targetAction":"","position":{"left":"73.96630934150076%","top":"62%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997856741","sceneId":1415997853342,"name":"action_18","type":"action","targetAnchor":"","targetAction":"","position":{"left":"30.93415007656968%","top":"65.14285714285714%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997853342},{"name":"scene 8","url":"http://saulburgos.com/apps/toursimages/img/tours-8.jpg","hotspots":[{"id":"hotspot1415997844585","sceneId":1415997844585,"name":"action_14","type":"action","targetAnchor":"","targetAction":"","position":{"left":"69.8291539050536%","top":"43.424107142857146%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997845197","sceneId":1415997844585,"name":"action_15","type":"action","targetAnchor":"","targetAction":"","position":{"left":"16.079632465543646%","top":"59.42857142857143%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997844585},{"name":"scene 9","url":"http://saulburgos.com/apps/toursimages/img/tours-9.jpg","hotspots":[{"id":"hotspot1415997833789","sceneId":1415997833789,"name":"action_11","type":"action","targetAnchor":"","targetAction":"","position":{"left":"15.313935681470138%","top":"34.857142857142854%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997836710","sceneId":1415997833789,"name":"action_12","type":"action","targetAnchor":"","targetAction":"","position":{"left":"69.67840735068913%","top":"33.142857142857146%","width":"7.656967840735069%","height":"14.285714285714286%"}},{"id":"hotspot1415997839054","sceneId":1415997833789,"name":"action_13","type":"action","targetAnchor":"","targetAction":"","position":{"left":"42.11332312404288%","top":"73.42857142857143%","width":"7.656967840735069%","height":"14.285714285714286%"}}],"id":1415997833789}]';

	$scope.tourToLoad = [];
	$scope.currentScene = {};
	$scope.hotspotClicked = {};

	$scope.sceneChanged = function(currentScene,index) {
		$scope.currentScene = currentScene;
	};

	$scope.clickOnAction = function(currentHotspot,index) {
		$scope.hotspotClicked = currentHotspot;
	};

	$scope.$on('$viewContentLoaded', function() {
		$scope.tourToLoad = angular.fromJson(scenesJson);   	
		console.log($scope.tourToLoad);
	});

});
