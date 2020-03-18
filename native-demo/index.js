

(function() {

    window.addEventListener('load', function() {

	document.getElementById('transpile').addEventListener('click',function() {
	    const tsCode = document.getElementById('input').value;
	    //console.log('tsCode',tsCode);
	    const jsCode = window.ts.transpile(tsCode);
	    document.getElementById('output').value = jsCode;
	} );

	document.getElementById('execute').addEventListener('click',function() {
	    const jsCode = document.getElementById('output').value;
	    //console.log('jsCode',jsCode);
	    var scriptNode = document.getElementById('executer');
	    if( !scriptNode ) {
		scriptNode = document.createElement('script');
		scriptNode.setAttribute('id','executer');
		document.getElementsByTagName('head')[0].appendChild(scriptNode);
	    }
	    scriptNode.innerHTML = jsCode;
	} );

    } );

})();
