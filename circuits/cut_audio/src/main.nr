fn main(wav: pub [u8; 4], start_index: pub Field, end_index: pub Field) -> pub [u8; 2] {
    let mut res: [u8; 2] = [0; 2];
    for i in 0..2 {
        if i >= end_index {
            res[i] = 0;
        } else {
            res[i] = wav[start_index+i];
        }
    }

    res
}

#[test]
fn test_no_cut() {
    let arr: [u8; 4] = [1, 2, 3, 4];
    let res = main(arr, 0, 2);

    assert(res[0] == 1);
    assert(res[1] == 2);
}