
function loadImage(image: HTMLImageElement): Promise<CanvasRenderingContext2D> {
    const canvas = document.getElementById('img-canvas') as HTMLCanvasElement;
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }

    return new Promise((resolve) => {
        const ctx = canvas.getContext('2d');
        image.addEventListener('load', () => {
            ctx.drawImage(image, 20, 10);
            resolve(ctx);
        });
    });
}

async function createContext(resource: CanvasRenderingContext2D | string): Promise<CanvasRenderingContext2D> {
    if (typeof resource === 'string') {
        const image = new Image();
        image.src = resource;
        return await loadImage(image);
    }

    return resource;
}


async function inverse(resource: CanvasRenderingContext2D | string): Promise<CanvasRenderingContext2D> {
    const canvasCtx = await createContext(resource);
    const imageData = canvasCtx.getImageData(20, 10, canvasCtx.canvas.width, canvasCtx.canvas.height);
    const data = imageData.data;
    const maxValue = 255;
    for (let i = 0; i < data.length; i+=4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // const a =  data[i + 3];

        data[i] = r ^ maxValue;  //  255 - r
        data[i + 1] = g ^ maxValue; // 255 - g
        data[i + 2] = b ^ maxValue;  // 255 - b
    }

    canvasCtx.putImageData(imageData, 20, 10);
    return canvasCtx;
}


async function grayscaled(resource: CanvasRenderingContext2D | string): Promise<CanvasRenderingContext2D> {
    const canvasCtx = await createContext(resource);
    const imageData = canvasCtx.getImageData(20, 10, canvasCtx.canvas.width, canvasCtx.canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i+=4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // const a =  data[i + 3];

        const lightness = (r + g + b) / 3;
        data[i] = lightness;
        data[i + 1] = lightness;
        data[i + 2] = lightness;

    }

    canvasCtx.putImageData(imageData, 20, 10);
    return canvasCtx;
}

export {grayscaled, inverse}


