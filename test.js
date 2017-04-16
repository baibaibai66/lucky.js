function Find(target, array) {
    // write code here
    for (var i = 0; i < array.length; i++) {
        var arr = array[i];
        var len = arr.length;
        if (target <= arr[len - 1]) {
            for (var j = 0; j < len; j++) {
                if (target === arr[j]) {
                    return true;
                }
            }
            return false;
        }
    }
    return false;
}

// console.log(Find(4, [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9]
// ]))



// console.log(GetLeastNumbers_Solution([1, 3, 10, 11, 2, 111, 1000, 6, 8], 4))

function GetLeastNumbers_Solution(input, k) {
    // write code here

    var arr = [];
    for (var i = 0; i < k; i++) {
        arr.push(input[i]);
    }
    arr.sort(function(a, b) {
        return a - b;
    });
    var len = input.length;
    for (var i = k; i < len; i++) {
        // console.log(input[i] < arr[k])
        if (input[i] < arr[k - 1]) {
            arr.push(input[i]);
            arr.sort(function(a, b) {
                return a - b;
            });
            arr.pop();
            // console.log(arr);
        }
    }
    return arr;
}

function ListNode(x) {
    this.val = x;
    this.next = null;
}

var pHead = new ListNode(3);
var aa = new ListNode(4);
pHead.next = aa;


function ReverseList(pHead) {
    // write code here
    if (!pHead) {
        return null;
    }
    var p = pHead,
        q = p.next,
        r = null;
    while (p) {
        console.log(p.val);
        p.next = r;
        r = p;
        p = q;
        q = q.next;
    }
    return r;
}

ReverseList(pHead)