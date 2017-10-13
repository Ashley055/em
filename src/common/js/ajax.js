
export function entAjax(url, param, method = 'POST') {
	// let common_src = 'http://192.168.1.50:8070/';
	let common_src = 'http://192.168.1.2:8151/entweb/';
	let isCross = true;
	let p1;
	if (isCross) {
		p1 = new Promise(function(resolve, reject){
		  	$$.ajax({
		    	url: common_src + url,
			    data: param,
		  	    xhrFields: {
		           withCredentials: true
		        },
		        crossDomain: true,
			    dataType: "json",
			    method: method,
			    success: function (data){
			    	resolve(data);
				},
				error: function(e) {
					reject(e);
				}
		    })
		});

	} else {
		p1 = new Promise(function(resolve, reject){
		  	$$.ajax({
		    	url: common_src + '/' + url,
			    data: param,
			    dataType: "json",
			    method: "post",
			    success: function (data){
			    	resolve(data)
				},
				error: function(e) {
					reject(e);
				}
		    })
		});
	}	

	return p1;

}