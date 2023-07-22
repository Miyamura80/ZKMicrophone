const fs = require("fs");
const keccak256 = require("keccak256");

const N = 65536;

function serialize_arr(arr) {
    return "[" + arr.map(b => `"${b}"`).join(",") + "]";
}

function zero_pad(arr, num_zeroes) {
    return arr.concat(new Array(num_zeroes).fill(0));
}

function zero_bytes(arr, start, end) {
    const res = arr.slice();
    for (var i = start; i < end; i++) {
        res[i] = 0;
    }
    return res;
}

async function editAudio() {
    let wav = [...(await fs.promises.readFile("./test.wav"))];
    const wav_hash = [...keccak256(wav)];
    const zero_indices = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

    const proverToml = 
`wav = ${serialize_arr(wav)}
wav_hash = ${serialize_arr(wav_hash)}
zero_indices = ${serialize_arr(zero_indices)}`;

    await fs.promises.writeFile("./out.wav", Buffer.from(wav));
    await fs.promises.writeFile("./Prover.toml", proverToml);
}

editAudio().then(() => {
    console.log("Done");
});
