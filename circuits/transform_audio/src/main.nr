// Competitive programming certainly helps :)))
fn main(hash_full_start: pub Field, hash_full_end: pub Field, wav_values_start: [Field; 25], wav_values_end: [Field; 25], wav_weights_start: pub [Field; 25], wav_weights_end: pub [Field; 25], bleeps_start: pub [Field; 25], bleeps_end: pub [Field; 25], hash_sub_start: pub Field, hash_sub_end: pub Field) -> pub Field {
	let breaker_field: Field = 147946756881789309620446562439722434560;
	let mut current_hash = hash_full_start + hash_full_end * breaker_field;

	for i in 0..25 {
		current_hash += (wav_weights_start[i] + breaker_field * wav_weights_end[i]) * ((bleeps_start[i] + breaker_field * bleeps_end[i]) - (wav_values_start[i] + breaker_field * wav_values_end[i]));
	}

	let hash_sub = hash_sub_start + hash_sub_end * breaker_field;
	assert(current_hash == hash_sub);
	current_hash
}
