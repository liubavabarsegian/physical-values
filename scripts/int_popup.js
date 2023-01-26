!function (e) { "function" != typeof e.matches && (e.matches = e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || function (e) { for (var t = this, o = (t.document || t.ownerDocument).querySelectorAll(e), n = 0; o[n] && o[n] !== t;)++n; return Boolean(o[n]) }), "function" != typeof e.closest && (e.closest = function (e) { for (var t = this; t && 1 === t.nodeType;) { if (t.matches(e)) return t; t = t.parentNode } return null }) }(window.Element.prototype);


document.addEventListener('DOMContentLoaded', function () {

    var modalButtons = document.querySelectorAll('.js-open-modal'),
        overlay = document.querySelector('.js-overlay-modal'),
        closeButtons = document.querySelectorAll('.js-modal-close');

    modalButtons.forEach(function (item) {

        item.addEventListener('click', function (e) {

            e.preventDefault();

            var modalId = this.getAttribute('data-modal'),
                modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
            console.log(modalId);

            modalElem.classList.add('active');
            overlay.classList.add('active');
            //document.getElementsByTagName("body")[0].style.overflow = 'hidden';
        });

    });


    closeButtons.forEach(function (item) {

        item.addEventListener('click', function (e) {
            var parentModal = this.closest('.modal');

            parentModal.classList.remove('active');
            overlay.classList.remove('active');
            //document.getElementsByTagName("body")[0].style.overflow = 'scroll';
            if (clickedHexagons.length > 0) {
                clickedHexagons.forEach(hexElement => Deactivate(hexElement));
                clickedHexagons = [];
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                drawingParallelogram = false;
            }
            //if (currentShownLaw.hexes) {
            //    hexagons = currentShownLaw.hexes.map(hex => document.getElementById(hex))
            //    hexagons.forEach(hex => Deactivate(hex))
            //}
        });

    });


    //document.body.addEventListener('keyup', function (e) {
    //    var key = e.keyCode;

    //    if (key == 27) {

    //        document.querySelector('.modal.active').classList.remove('active');
    //        document.querySelector('.overlay').classList.remove('active');
    //    };
    //}, false);


    //overlay.addEventListener('click', function () {
    //    document.querySelector('.modal.active').classList.remove('active');
    //    this.classList.remove('active');
    //});




});



