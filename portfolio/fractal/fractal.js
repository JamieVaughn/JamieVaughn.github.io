var creal = -0.8;
var cimg = 0.156;
var canvas = document.getElementById('my-canvas');
var context = canvas.getContext('2d');
var frame = 0;
var colors = [];

function juliaFractal() {
    for(y = 0; y < 200; y++) {
        for( x = 0; x < 200; x++) {
            var cx = -2 + x/50;
            var cy = -2 + y/50;
            var i = 0;
            do {
                xt = cx**2 - cy**2 + creal;
                cy = 2 * cx * cy + cimg;
                cx = xt;
                i++;
            } while((cx**2 + cy**2 < 4) && i < 25)
            // i = i.toString(16); // For black and white version
            context.beginPath();
            context.rect(x*4, y*4, 4, 4);
            context.fillStyle = colors[i]; // black and white: '#' + i + i + i;
            context.fill();
        }
    }
    frame++;
    creal = -0.8 + 0.6 * Math.sin(frame/(Math.PI * 20));
    cimg = 0.156 + 0.4 * Math.cos(frame/(Math.PI * 40));
}

for(x = 0; x < 9; x++) {
    color = (31 * x).toString(16);
    if(color.length == 1) color = '0' + color;
    colors[x] = '#' + color + color + 'fa';
    colors[x + 8] = '#00fa' + color;
    colors[x + 17] = '#' + color + '0000';
}

setInterval(juliaFractal, 100);