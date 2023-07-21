const fs = require("fs");

async function editAudio() {
    const wav = await fs.promises.readFile("./test.wav");

    for (var i = 3*5000; i < 3*8000; i++) {
        wav[i] = 0;
    }

    await fs.promises.writeFile("./out.wav", wav);
}

editAudio().then(() => {
    console.log("Done");
});
