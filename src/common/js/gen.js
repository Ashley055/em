import {entAjax} from './ajax'
export function getRequest() {   
  var url = window.location.search; //获取url中"?"符后的字串   
  var theRequest = new Object();   
  if (url.indexOf("?") != -1) {   
      var str = url.substr(1);   
      strs = str.split("&");   
      for(var i = 0; i < strs.length; i ++) {   
          //就是这句的问题
          theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]); 
          //之前用了unescape()
          //才会出现乱码  
      }   
  }   
  return theRequest;   
}

export function infinitLoading() {
	//这总方法，就不用attach
	// var myApp = new Framework7(); 
	// var $$ = Dom7;

	var myApp = new Framework7();
	var $$ = Dom7;
	 
	// Loading flag
	var loading = false;
	 
	// Last loaded index
	var lastIndex = $$('.warehouse-list li').length;
	 
	// Max items to load
	var maxItems = 60;
	 
	// Append items per load
	var itemsPerLoad = 20;
	
	myApp.attachInfiniteScroll(".infinite-scroll");
	// Attach 'infinite' event handler
	$$('.infinite-scroll').on('infinite', function () {
	 
	  // Exit, if loading in progress
	  if (loading) return;
	 
	  // Set loading flag
	  loading = true;
	 
	  // Emulate 1s loading
	  setTimeout(function () {
	    // Reset loading flag
	    loading = false;
	    // myApp.attachInfiniteScroll(".infinite-scroll"); 
	 
	    if (lastIndex >= maxItems) {
	      // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
	      myApp.detachInfiniteScroll($$('.infinite-scroll'));
	      // Remove preloader
	      $$('.infinite-scroll-preloader').remove();
	      return;
	    }
	 
	    // Generate new items HTML
	    var html = '';
	    for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
	      html += '<li class="item-content"><div class="item-inner"><div class="item-title">Item ' + i + '</div></div></li>';
	    }
	 
	    // Append new items
	    $$('.warehouse-list ul').append(html);
	 
	    // Update last loaded index
	    lastIndex = $$('.warehouse-list li').length;
	  }, 1000);
	}); 
}


export function matchSelect(key) {

	return new Promise(function(resolve, reject){

		var arr = [];
		var param = {
			key: key,
			pathVar: '/mgtdict/getDictByKeys.do',
		};
		entAjax('baseAction.do', param).then(result => {
			if(result.code == '0000'){
				var valueList = JSON.parse(result.desc)
				valueList.forEach((value)=>{
					arr.push(value.name);
				})

				resolve(arr);
			}
		});
	});

	
}
export function matchCategory(){
	return new Promise(function(resolve, reject){
		var categoryNames = []
		var categories = []
		var param = {
			pathVar: '/warehouseInfo/getBizType.do',
		};
		entAjax('baseAction.do', param).then(function(data){
			if(data.code == '0000'){
				var newlist = data.desc;
				newlist.forEach((obj)=>{
					categoryNames.push(obj.name)
					categories.push(obj.code)
				})
				resolve([categories,categoryNames]);
			}
		})
	})
}
export function getValues (key, dom) {
	var values = '';
	var displayValues = '';
	var param = {
		key: key,
		pathVar: '/mgtdict/getDictByKeys.do',
	};
	entAjax('baseAction.do', param).then(result => {
		if(result.code == '0000'){
			var valueList = JSON.parse(result.desc)
			valueList.forEach((value)=>{
				values = values +' ' + value.code
				displayValues = displayValues +' ' + value.name
			})
		}
	}).then(()=>{
		var pickerDescribe = window.f7App.picker({
		    input: dom,
		    // rotateEffect: true,
		    toolbarCloseText: '完成',
		    formatValue: function (picker, values, displayValues) {
		    	var datavalue = values;
		    	$$(dom).attr('data-value', datavalue);
		        return displayValues;
		    },
		    cols: [
		        {
		            textAlign: 'left',
		            values: values.split(' '),
		            displayValues: displayValues.split(' '),
		            toolbarCloseText: '完成'
		        }
		    ]
		});
	})

}
export function selectArea (dom) {
	var citysobj = {}, citysobjIds = {};
	var areasobj = {}, areasobjIds = {};
	var provinces = [];
	var provincesIds = [];
	var param = {
		pathVar: '/mgtRegion/selectFjList.do',
	};
	entAjax('baseAction.do', param).then(result => {
		console.log(result)
		if(result.code == '0000'){
			var newlist = result.rows;
			var areas = []
			var areasCodes = []
			newlist.forEach(function(province,index) {
				provinces.push(province.name);
				provincesIds.push(province.id);
			
				citysobj[province.name] = [];
				citysobjIds[province.id] = [];

				province.child.forEach(function(city, index){

					citysobj[province.name].push(city.name);
					citysobjIds[province.id].push(city.id);

					areasobj[city.name] = [];
					areasobjIds[city.id] = [];

					city.child.forEach(function(area){
						areasobj[city.name].push(area.name);
						areasobjIds[city.id].push(area.id);
						areas.push(area.name)
						areasCodes.push(area.id)
					});
				});
			})
			window.areas = areas
			window.areasCodes = areasCodes
			console.log(areasCodes)
			var pickerDependent = f7App.picker({
			    input: dom,
			    rotateEffect: true,
			    toolbarCloseText: '完成',
			    formatValue: function (picker, values, displayValues) {
			    	var datavalue = values[2];
			    	$$(dom).attr('data-value', datavalue);
			        return displayValues[0] + displayValues[1] + displayValues[2];
			    },
			    cols: [
			        {
			            textAlign: 'left',
			            values: provincesIds,
			            displayValues: provinces,
			            width: '30%',
			            onChange: function (picker, provinceId, province) {
			                if(picker.cols[1].replaceValues){
			                    picker.cols[1].replaceValues(citysobjIds[provinceId], citysobj[province]);
			                }
			            }
			        },
			        {
			        	textAlign: 'left',
			            values: citysobjIds[provincesIds[0]],
			            displayValues: citysobj[provinces[0]],
			            width: '40%',
			            onChange: function (picker, cityId, city) {
			            	if(picker.cols[2].replaceValues){
			            	    picker.cols[2].replaceValues(areasobjIds[cityId],areasobj[city]);
			            	}
			            }
			        },
			        {
			        	textAlign: 'left',
			        	values: areasobjIds[citysobjIds[provincesIds[0]][0]] || citysobjIds[provincesIds[0]],
			        	displayValues: areasobj[citysobj[provinces[0]][0]] || '',
			        	width: '30%',
			        }
			    ]
			});
		}
	})
}
