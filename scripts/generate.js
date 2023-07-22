const fs = require("fs");
const keccak256 = require("keccak256");

const N = 65536;

function serialize_arr(arr) {
    return "[" + arr.map(b => `"${b}"`).join(",") + "]";
}

function zero_pad(arr, max_len) {
    return arr.concat(new Array(Math.max(0, max_len - arr.length)).fill(0));
}

async function generate() {
    let wav = zero_pad([...(await fs.promises.readFile("./test.wav"))], N);
    const wav_hash = [...keccak256(wav)];
    const zero_indices = zero_pad([], 32);

    console.log(wav.length);
    console.log(wav_hash.length);
    console.log(zero_indices.length);

    const proverToml = 
`wav = ${serialize_arr(wav)}
wav_hash = ${serialize_arr(wav_hash)}
zero_indices = ${serialize_arr(zero_indices)}`;

    await fs.promises.writeFile("./Prover.toml", proverToml);
}

generate().then(() => {
    console.log("Done");
});
