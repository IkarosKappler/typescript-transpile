
(function() {

    // This requires that typescriptServices.js and tslib.js are present

    var requestResource = function(path,success,reject) {
	console.log('Requesting path', path );
	var xhr = new XMLHttpRequest();
	xhr.open('GET', path);
	xhr.onload = function() {
	    if (xhr.status === 200) 
		success(xhr.responseText);
	    else 
		reject(xhr.status);
	};
	xhr.send();
    };

    var transpileCodes = function( tsCodes, pathNames ) {
	const head = document.getElementsByTagName('head')[0];
	console.log('Transpiling '+tsCodes.length+' codes');
	for( var i = 0; i < tsCodes.length; i++ ) {
	    try {
		let jsCode = window.ts.transpile(tsCodes[i]);
		scriptNode = document.createElement('script');
		scriptNode.setAttribute('id','ts-transpiled-'+i);
		scriptNode.innerHTML = jsCode;
		head.appendChild(scriptNode);
	    } catch( e ) {
		console.warn("Failed to transpile code "+i+" ("+pathNames[i]+")");
		console.error(e);
	    }
	}
    };


    var resourcesLoaded = 0;
    window.addEventListener('load', function() {

	var scriptNodes = document.querySelectorAll('script[language=typescript]');
	var tsCodes = new Array(scriptNodes.length);
	var pathNames = new Array(scriptNodes.length);
	for( var i = 0; i < scriptNodes.length; i++ ) {
	    var src = scriptNodes[i].getAttribute('src');
	    pathNames[i] = src;
	    console.log(src);
	    // Call this inside a closure to avoid collisions.
	    (function(path,index,maxCount) {
		requestResource( path,
				 function(result) {
				     // console.log('loaded', path );
				     tsCodes[index] = result;
				     if( ++resourcesLoaded == maxCount )
					 transpileCodes( tsCodes, pathNames );
				 },
				 function(errorCode) {
				     console.warn("Failed to load source '"+path+"'. Error code "+errorCode+".")
				 }
			       );
	    })(src,i,scriptNodes.length);
	}
    } );
    
}());
