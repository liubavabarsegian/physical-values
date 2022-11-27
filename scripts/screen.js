////const html2canvas = require('window.html2canvas');
////import html2canvas from 'window.html2canvas';

//function takeshot() {
//	let body =
//		document.querySelector("body");

//	// Use the html2canvas
//	// function to take a screenshot
//	// and append it
//	// to the output div

//	//так работает

//	// html2canvas(body).then(
//	// 	function (canvas) {
//	// 		document
//	// 		.querySelector("body")
//	// 		.appendChild(canvas);
//	// 	})


//		html2canvas(document.querySelector('body'), {
//            onrendered: function(canvas) {
//                var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
//				window.location.href=image;
//            }
//        });
//}

function takeshot() {
    document.getElementById('output_screen').innerHTML = '';
    let div =
        document.getElementById('screen_area');

    // Use the html2canvas
    // function to take a screenshot
    // and append it
    // to the output div
    html2canvas(div).then(
        function (canvas) {
            document
                .getElementById('output_screen')
                .appendChild(canvas);
        })
}