const fs = require("fs");

function zero_bytes(arr, start, end) {
    const res = arr.slice();
    for (var i = start; i < end; i++) {
        res[i] = 0;
    }
    return res;
}

async function editAudio() {
    let wav = zero_bytes([...(await fs.promises.readFile("./test.wav"))], 2 * 3 * 1000, 2 * 3 * 2000);
    await fs.promises.writeFile("./out.wav", Buffer.from(wav));
}

editAudio().then(() => {
    console.log("Done");
});
