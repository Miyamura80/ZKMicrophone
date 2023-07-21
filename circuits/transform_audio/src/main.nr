fn main(wav: pub [u8; 128], zero_indices: pub [bool; 128]) -> pub [u8; 128] {
    let mut res: [u8; 128] = wav;
    for i in 0..128 {
        if zero_indices[i] {
            res[i] = 0;
        }
    }

    res
}

#[test]
fn test_main_no_zeroing() {
    let mut arr: [u8; 128] = [0; 128];
    arr[0] = 1;
    arr[1] = 2;
    arr[2] = 3;
    arr[3] = 4;
    let mut zero_indices: [bool; 128] = [false; 128];
    let res = main(arr, zero_indices);

    assert(res[0] == 1);
    assert(res[1] == 2);
    assert(res[2] == 3);
    assert(res[3] == 4);
}

#[test]
fn test_main_zeroing() {
    let mut arr: [u8; 128] = [0; 128];
    arr[0] = 1;
    arr[1] = 2;
    arr[2] = 3;
    arr[3] = 4;
    let mut zero_indices: [bool; 128] = [false; 128];
    zero_indices[1] = true;
    zero_indices[2] = true;
    let res = main(arr, zero_indices);

    assert(res[0] == 1);
    assert(res[1] == 0);
    assert(res[2] == 0);
    assert(res[3] == 4);
}
