#!/usr/bin/env python3
import copy
from argparse import ArgumentParser
import wave
import base64



FIELD_MOD = (
    21888242871839275222246405745257275088548364400416034343698204186575808495617
)
BREAKER_FIELD_MOD = 147946756881789309620446562439722434560
BASE = 257

"""
There is an issue with noir, not allowing integers > 2^128 as inputs, although
fields should be to ~2^254. I'm doing the classing trick: Split the numbers as:
    x = a + b * sqrt(MAX_ALLOWED)

More precisely this will be BREAKER_FIELD_MOD ~= sqrt(FIELD_MOD).
"""
def split_noir_field(x):
    return x % BREAKER_FIELD_MOD, x // BREAKER_FIELD_MOD


def fast_pow_mod(x, n):
    res = 1
    while n > 0:
        if n % 2 == 1:
            res = res * x % FIELD_MOD

        x = x * x % FIELD_MOD
        n = n // 2

    return res


def serial_arr_int(arr):
    return "[" + ", ".join([f'"{str(x)}"' for x in arr]) + "]"


def split_noir_field_array(arr):
    both = [split_noir_field(x) for x in arr]
    return (
        serial_arr_int([x[0] for x in both]),
        serial_arr_int([x[1] for x in both]),
    )


def poly_hash_bytes(b__N):
    poly_hash = 0
    for b in b__N:
        poly_hash = (poly_hash * BASE + int(b)) % FIELD_MOD 
    return poly_hash


def parse_args():
    parser = ArgumentParser(description="Noir prover script")
    parser.add_argument("--input_wav", type=str, help="wav file of real input")
    parser.add_argument("--output_wav", type=str, help="wav file of edited input")
    parser.add_argument("--bleeps_spec", type=str, help="bleeps spec file")
    parser.add_argument("--prover_toml_path", type=str, help="prover toml file")
    parser.add_argument("--proof_output", type=str, help="proof output file")
    return parser.parse_args()


def setup_circuit(input_frames, output_frames, bucket_positions, bleeps, orig_buckets, bucket_size, prover_toml_path):
    with open(prover_toml_path, "w") as f:
        serial_hash_full = poly_hash_bytes(input_frames)
        serial_hash_full_start, serial_hash_full_end = split_noir_field(serial_hash_full)

        serial_hash_sub = serial_arr_int(output_frames)
        serial_hash_sub_start, serial_hash_sub_end = split_noir_field(serial_hash_sub) 
        
        wav_values = [] 
        wav_weights = []
        bleeps = []
        for pb, bleep in zip(bucket_positions, bleeps):
            wav_values.append(poly_hash_bytes(orig_buckets[pb])) 
            wav_weights.append(fast_pow_mod(BASE, pb * bucket_size))
            bleeps.append(poly_hash_bytes(bleep))
       
        serial_wav_values_start, serial_wav_values_end = split_noir_field_array(wav_values)
        serial_wav_weights_start, serial_wav_weights_end = split_noir_field_array(wav_weights)
        serial_bleeps_start, serial_bleeps_end = split_noir_field_array(bleeps)

        circuit_input = f"""hash_full_start = \"{serial_hash_full_start}\"
hash_full_end = \"{serial_hash_full_end}\"
wav_values_start = {serial_wav_values_start}
wav_values_end = {serial_wav_values_end}
wav_weights_start = {serial_wav_weights_start}
wav_weights_end = {serial_wav_weights_end}
bleeps_start = {serial_bleeps_start}
bleeps_end = {serial_bleeps_end}
hash_sub_start = \"{serial_hash_sub_start}\"
hash_sub_end = \"{serial_hash_sub_end}\""""
        
        f.write(circuit_input)


def solve_circuit(prover_toml_path, proof_output):
    import subprocess

    subprocess.run(
        [
            "nargo",
            "prove",
            "--prover_name", prover_toml_path, 
            "--bin",
            "noir_prover",
            "--",
            prover_toml_path,
            proof_output,
        ]
    )




def work(input_wav, output_wav, bleeps_spec, prover_toml_path, proof_output):
    with wave.open(input_wav, "rb") as wav_file:
        params = wav_file.getparams()
        frames = wav_file.readframes(params.nframes)

    with open(bleeps_spec, "r") as f:
        bucket_size = int(f.readline())
        positions = [int(x) for x in f.readline().split()]
        bleeps = [base64.b64decode(x) for x in f.readline().split()]

        assert len(positions) == len(bleeps)
        for pos, bleep_array in zip(positions, bleeps):
            assert pos * bucket_size < len(frames)

            current_bucket_size = min(bucket_size, len(frames) - pos * bucket_size)
            assert len(bleep_array) == current_bucket_size

    # Efficiently make bleeps, so no special function!
    new_buckets = []
    for i, cframe in enumerate(frames):
        if i % bucket_size == 0:
            new_buckets.append([])

        new_buckets[cframe // bucket_size].append(cframe)

    buckets = copy.deepcopy(new_buckets) 
    for pos, bleep_array in zip(positions, bleeps):
        new_buckets[pos] = [val_in_bytes_is_int for val_in_bytes_is_int in bleep_array]

    edited_frames = bytes([frame for bucket in new_buckets for frame in bucket])
    with wave.open(output_wav, "wb") as wav_file:
        wav_file.setparams(params)
        wav_file.writeframes(edited_frames)

    setup_circuit(frames, edited_frames, positions, bleeps, buckets, bucket_size, prover_toml_path)
    # solve_circuit(prover_toml_path, proof_output)


def main(args=None):
    if args is None:
        args = parse_args()

    work(
        args.input_wav,
        args.output_wav,
        args.bleeps_spec,
        args.prover_toml_path,
        args.proof_output,
    )


if __name__ == "__main__":
    main()
