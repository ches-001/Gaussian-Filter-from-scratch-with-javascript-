var blur_btn = document.getElementById('blur-btn');
var image = document.getElementById('image');
image.crossOrigin = 'anonymous';


window.onload = function() {
    blur_btn.addEventListener('click', function() {
        let w = image.width;
        let h = image.height;

        //parameters
        let kernel_width = document.getElementById('k_width').value;
        let kernel_height = document.getElementById('k_height').value;
        let sigma = document.getElementById('sigma').value;

        if (kernel_height % 2 !== 1 || kernel_width % 2 !== 1) {
            document.getElementById('error-msg').innerHTML = '<p>Kernel width and height must be odd numbers</p>';
            return false;
        }

        //create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(image, 0, 0, w, h);
        let image_data = ctx.getImageData(0, 0, w, h);

        //create filtered image
        blurred_data = apply_gaussian_blur(
            image_data.data,
            image_size = [w, h],
            kernel_size = [kernel_width, kernel_height],
            sigma = sigma);

        //set image source to new canvas image data
        image_data.data.set(blurred_data);
        ctx.putImageData(image_data, 0, 0);
        image.src = canvas.toDataURL();
    });
}


function apply_gaussian_blur(PX, image_size, kernel_size, sigma) {
    let blurredPX = new Float32Array(PX.length);
    let gaussian_filter = create_gaussian_filter(kernel_size, sigma);

    let k_w = kernel_size[0];
    let k_h = kernel_size[1];
    let img_w = image_size[0];
    let kc_idx = Math.ceil((k_w * k_h) / 2) - 1;

    //Time complexity: 0(img_w * img_h * k_w * k_h)
    for (i = 0, img_len = PX.length; i < img_len; i++) {
        if (i % 4 === 3) { blurredPX[i] = PX[i]; continue; }

        let weighted_sum = PX[i] * gaussian_filter[kc_idx];
        for (j = 0; j < k_h; j++) {
            for (k = 0; k < k_w; k++) {
                let ck_idx = (k_w * j) + k;
                if (kc_idx === ck_idx) { continue; }

                x_offset = k - Math.floor(k_w / 2);
                y_offset = j - Math.floor(k_w / 2);
                weighted_sum += gaussian_filter[ck_idx] * (
                    PX[i + ((img_w * 4 * y_offset) + x_offset)] ||
                    PX[i - ((img_w * 4 * y_offset) - x_offset)]
                );
            }
        }
        let gaussian_sum = gaussian_filter.reduce((a, b) => a + b, 0)
        blurredPX[i] = weighted_sum / gaussian_sum;
    }
    //console.log('gaussian filter: \n', gaussian_filter, '\n blurred pixels:', blurredPX);
    return blurredPX;
}


function create_gaussian_filter(kernel_size, sigma) {
    w = Math.floor(kernel_size[0] / 2);
    h = Math.floor(kernel_size[1] / 2);

    let filter = [];

    for (j = -h; j < h + 1; j++) {
        for (i = -w; i < w + 1; i++) {
            let x1 = (2 * Math.PI) * (sigma ** 2);
            let x2 = Math.exp(-((j ** 2) + (i ** 2)) / (2 * (sigma ** 2)));
            let val = (1 / x1) * x2;
            filter.push(val);
        }
    }
    return filter;
}