/**
 * This is the Typescript loader.
 *
 * Each script inside the DOM that has 'language=typescript' will be asynchronously loaded
 * and transpiled.
 *
 * It requires typescriptServices.js and tslib.js to be present.
 *
 * If you want to be called back when all Typescripts have been loaded and transpiled
 * add a function: window.onTypescriptsLoaded(boolean).
 *
 * @author  Ikaros Kappler
 * @date    2020-03-18
 * @version 1.0.0
 **/

(function() {

    /**
     * Request to load the given resource (specified by 'path', relative or absolute)
     * with an asynchronous XHR request.
     *
     * @param {string} path - The resoruce's path. Should be a text file.
     * @param {function(string)} success - A success callback (accepting the file contents as a string).
     * @param {function(number)} reject - A failure callback (accepting the error code).
     * @return {void}
     **/
    var requestResource = function(path,success,reject) {
	// console.log('Requesting path', path );
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


    /**
     * Transpile a batch of loaded Typescript codes.
     *
     * Each successfully transpiled code (result is a JS code) will be attached to the 
     * DOM's header as a <script> tag.
     *
     * @param {Array<string>} tsCodes - The actual ts codes in an array.
     * @param {Array<string>} pathNames - The resource names; used for proper error messages.
     * @return {number} errorCount
     **/
    var transpileCodes = function( tsCodes, pathNames ) {
	const head = document.getElementsByTagName('head')[0];
	// console.log('Transpiling '+tsCodes.length+' codes');
	var errorCount = 0;
	for( var i = 0; i < tsCodes.length; i++ ) {
	    try {
		let jsCode = window.ts.transpile(tsCodes[i]);
		scriptNode = document.createElement('script');
		scriptNode.setAttribute('id','ts-transpiled-'+i);
		scriptNode.innerHTML = jsCode;
		head.appendChild(scriptNode);
	    } catch( e ) {
		errorCount++;
		console.warn("Failed to transpile code "+i+" ("+pathNames[i]+")");
		console.error(e);
	    }
	}
	return errorCount;
    };


    /**
     * This triggers the process.
     **/
    var processTypescript = function() {
	var scriptNodes = document.querySelectorAll('script[language=typescript]');
	var resourcesLoaded = 0;
	var tsCodes = new Array(scriptNodes.length);
	var pathNames = new Array(scriptNodes.length);
	for( var i = 0; i < scriptNodes.length; i++ ) {
	    var src = scriptNodes[i].getAttribute('src');
	    pathNames[i] = src;
	    // Call this inside a closure to avoid collisions.
	    (function(path,index,maxCount) {
		requestResource( path,
				 function(result) {
				     // Resource has been loaded.
				     tsCodes[index] = result;
				     // If all n resources have been loaded, transpile them
				     // in exact the original order.
				     if( ++resourcesLoaded == maxCount ) {
					 var errorCount = transpileCodes( tsCodes, pathNames );
					 if( typeof window.onTypescriptsLoaded === "function" )
					     window.onTypescriptsLoaded(errorCount==0);
				     }
				 },
				 function(errorCode) {
				     console.warn("Failed to load source '"+path+"'. Error code "+errorCode+".")
				 }
			       );
	    })(src,i,scriptNodes.length);
	}
    }


    // Start the process when the document is fully loaded.
    window.addEventListener('load', processTypescript );
    
}());
