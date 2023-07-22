use dep::std;
use dep::std::hash;


fn fast_power(base: Field, exp: u16) -> Field {
	let mut result = 1;
	let mut power: u16 = exp;
	let mut value = base;

	for i in 0..16 {
		if power % 2 == 1 {
			result = result * value;
		}
		value = value * value;
		power = power / 2;
	}

	result
}

fn change_hash_one(wav_hash: Field, wav_value_i: u8, wav_index_i: u16, bleep: u8) -> Field {
	let base_pow_i = fast_power(257, wav_index_i); 
	let mut hash = wav_hash - (wav_value_i as Field) * base_pow_i;
	hash = hash + (bleep as Field) * base_pow_i;
	hash
}

fn change_hash<N>(wav_hash: Field, wav_values: [u8; N], wav_indices: [u16; N], bleep: u8) -> Field {
	let mut hash = wav_hash;
	for i in 0..N {
		hash = change_hash_one(hash, wav_values[i], wav_indices[i], 0);
	}
	hash
}

// NOT FULLY PRIVATE
// fn main(maybe_hashes: pub [Field; 4], wav_values: pub [u8; 3], wav_indices: pub [u16; 3], bleeps: pub [u8; 3]) -> pub bool {
// 	// Pls make this parallel
// 	let mut output: bool = true;
// 	for i in 0..3 {
// 		if change_hash_one(maybe_hashes[i], wav_values[i], wav_indices[i], bleeps[i]) != maybe_hashes[i + 1] {
// 			output = false;
// 		}
// 	}

// 	output
// }


fn main(hash_full: pub Field, wav_values: [Field; 1000], wav_weights: pub [Field; 1000], bleeps: pub [Field; 1000]) -> pub Field {
	let mut current_hash = hash_full;
	for i in 0..1000 {
		current_hash += wav_weights[i] * (bleeps[i] - wav_values[i]);  
	}

	current_hash
}


#[test]
fn test_main_no_zeroing() {
	let hash: Field = 3827498173489;
		
	for i in 0..5000 { 
		assert(change_hash_one(hash, 1, 1, 0) == 3827498173489 - 257);
	}
}
