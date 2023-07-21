fn main(wav : pub [u8; 4], wav_len: pub u32, zero_offsets: pub [Field; 4]) -> pub [u8; 4] {
    let mut res: [u8; 4] = wav;
    for i in 0..4 {
        if zero_offsets[i] != 0 {
            res[zero_offsets[i]] = 0;
        }
    }

    res
}

#[test]
fn test_main_no_zeroing() {
    let arr: [u8; 4] = [1, 2, 3, 4];
    let res = main(arr, 4, [0, 0, 0, 0]);

    assert(res[0] == 1);
    assert(res[1] == 2);
    assert(res[2] == 3);
    assert(res[3] == 4);
}

#[test]
fn test_main_zeroing() {
    let arr: [u8; 4] = [1, 2, 3, 4];
    let res = main(arr, 4, [1, 0, 0, 0]);

    assert(res[0] == 1);
    assert(res[1] == 0);
    assert(res[2] == 3);
    assert(res[3] == 4);
}
