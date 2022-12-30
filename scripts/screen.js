function takeshot() {
    document.getElementById('output_screen').innerHTML = '';

    let node = document.getElementById('newf');
    clickedHexagons.forEach(hexElement => Deactivate(hexElement));
    clickedHexagons = [];
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    domtoimage.toPng(node)
        .then(dataUrl => {
            var img = new Image();
            img.src = dataUrl;
            document.getElementById('output_screen').appendChild(img);
        })
}