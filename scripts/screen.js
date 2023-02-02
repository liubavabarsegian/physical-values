function takeshot() {
    document.getElementById('output_screen').innerHTML = '';

    let node = document.getElementById('newf');
    if (clickedHexagons.length > 0) {
        clickedHexagons.forEach(hexElement => Deactivate(hexElement));
        clickedHexagons = [];
    }
    if (currentShownLaw.hexes) {
        hexagons = currentShownLaw.hexes.map(hex => document.getElementById(hex))
        hexagons.forEach(hex => Deactivate(hex))
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    domtoimage.toPng(node)
        .then(dataUrl => {
            var img = new Image();
            img.src = dataUrl;
            document.getElementById('output_screen').appendChild(img);
        })
}