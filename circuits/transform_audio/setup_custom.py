import numpy as np

FIELD_MOD = 21888242871839275222246405745257275088548364400416034343698204186575808495617
BASE = 257


def fast_pow_mod(x, n):
    res = 1
    while n > 0:
        if n % 2 == 1:
            res = res * x % FIELD_MOD
        
        x = x * x % FIELD_MOD
        n = n // 2

    return res


def serial_arr_int(arr):
    return "[" + ", ".join([f"\"{str(x)}\"" for x in arr]) + "]"

# s = input("Enter string: ")
# N = input("Enter number of bleeps: ")
# bleeps = [*map(int, input("Enter bleeps (space separated): ").split())]

s = "dfahdjkfhjkadhfjkhadjkfhjkdfhajkahfjkhadjkfh" * 100

poly_hash_full = 0
for c in s:
    poly_hash_full = (poly_hash_full * BASE + ord(c)) % FIELD_MOD


current_hash = poly_hash_full
maybe_hashes = [current_hash]
wav_indices = []
wav_weights = []
bleeps = [] 

N = 1000
for i in range(N):
    pos = np.random.randint(0, len(s))
    bleep = 0

    base_pow = fast_pow_mod(BASE, pos) 
    current_hash = current_hash - (ord(s[pos]) * base_pow) % FIELD_MOD
    if current_hash < 0:
        current_hash += FIELD_MOD
    current_hash = (current_hash + base_pow * bleep) % FIELD_MOD

    maybe_hashes.append(current_hash)
    wav_indices.append(pos)
    bleeps.append(bleep)


with open("Prover.toml") as f:
    serial_maybe_hashes = serial_arr_int(maybe_hashes)
    serial_wav_indices = serial_arr_int(wav_indices)
    serial_wav_weights = serial_arr_int([fast_pow_mod(BASE, i) for i in wav_indices])
    serial_wav_values = serial_arr_int([int(ord(s[i])) for i in wav_indices])
    serial_bleeps = serial_arr_int(bleeps)
 
    # prover_scheme = f"""maybe_hashes = {serial_maybe_hashes}
# wav_values = {serial_wav_values}
# wav_indices = {serial_wav_indices}
# bleeps = {serial_bleeps}"""

    prover_scheme = f"""hash_full = \"{poly_hash_full}\" 
wav_values = {serial_wav_values}
wav_weights = {serial_wav_weights}
bleeps = {serial_bleeps}"""
    
    with open("Prover.toml", "w") as f2:
        f2.write(prover_scheme)
    
