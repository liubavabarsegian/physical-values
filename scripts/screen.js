function takeshot() {
    document.getElementById('output_screen').innerHTML = '';

    /*НАДО ЗАПИСАТЬ ЗАМЕНУ ВСЕХ ACTIVE КЛАССОВ НА ОБЫЧНЫЕ*/

    let node = document.getElementById('newf');

    domtoimage.toPng(node)
        .then(dataUrl => {
            var img = new Image();
            img.src = dataUrl;
            document.getElementById('output_screen').appendChild(img);
        })
}