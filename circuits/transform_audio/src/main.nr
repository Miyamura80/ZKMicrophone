use dep::std::hash;

fn main(mut wav: [u8; 65536], wav_hash: pub [u8; 32], zero_indices: pub [Field; 32]) -> pub [u8; 65536] {
    // let mut res: [u8; 65536] = wav;
    let calculated_hash = hash::keccak256(wav, 65536);

    for i in 0..32 {
        assert(calculated_hash[i] == wav_hash[i]);
    }

    for i in 0..32 {
        if zero_indices[i] != 0 {
            wav[zero_indices[i]] = 0;
        }
    }

    // for i in 0..65536 {
    //     if zero_indices[i] {
    //         res[i] = 0;
    //     }
    // }

    wav
}

#[test]
fn test_main_no_zeroing() {
    let mut arr: [u8; 65536] = [0; 65536];
    arr[0] = 1;
    arr[1] = 2;
    arr[2] = 3;
    arr[3] = 4;
    let mut zero_indices: [Field; 32] = [0; 32];
    zero_indices[0] = 1;
    let hash: [u8; 32] = hash::keccak256(arr, 65536);
    let res = main(arr, hash, zero_indices);

    assert(res[0] == 1);
    assert(res[1] == 0);
    assert(res[2] == 3);
    assert(res[3] == 4);
}

// #[test]
// fn test_main_zeroing() {
//     let mut arr: [u8; 65536] = [0; 65536];
//     arr[0] = 1;
//     arr[1] = 2;
//     arr[2] = 3;
//     arr[3] = 4;
//     let mut zero_indices: [bool; 65536] = [false; 65536];
//     zero_indices[1] = true;
//     zero_indices[2] = true;
//     let res = main(arr, zero_indices);

//     assert(res[0] == 1);
//     assert(res[1] == 0);
//     assert(res[2] == 0);
//     assert(res[3] == 4);
// }
