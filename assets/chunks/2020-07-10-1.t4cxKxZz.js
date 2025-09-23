const n=`---
title: 数据结构及算法复习笔记
date: 2020-07-10
lang: zh_CN
categories:

 - study

---

# 数据结构及算法复习笔记

## 排序算法

### 1. 归并排序

归并排序比较简单，写代码的时候最需要注意的就是搞清楚数组的边界。

\`\`\`cpp
#include <iostream>
#include <cmath>

using namespace std;

void merge(int A[], int start, int mid, int end) {
    int n1 = mid - start + 1;
    int n2 = end - mid;
    int L[n1 + 1] = {0}, R[n2 + 1] = {0};
    int i, j;
    for (i = 0; i < n1; i++)
        L[i] = A[start + i];
    for (j = 0; j < n2; j++)
        R[j] = A[mid + j + 1];
    L[n1] = 0x3FFFFFFF;
    R[n2] = 0x3FFFFFFF;
    i = 0;
    j = 0;
    for (int k = start; k <= end; k++) {
        if (L[i] <= R[j]) {
            A[k] = L[i];
            i++;
        }
        else { 
            A[k] = R[j];
            j++;
        }
    }
}

void mergeSort(int A[], int start, int end) {
    if (start < end) {
        int mid;
        mid = floor((float)(start+end)/2.0);
        mergeSort(A, start, mid);
        mergeSort(A, mid+1, end);
        merge(A, start, mid, end);
    } 
}

int main() {
    int A[10] = {1, 4, 7, 2, 5, 8, 0, 3, 6, 9};
    mergeSort(A, 0, 9);
    for(int i = 0; i < 10; i++)
        cout << A[i] << " ";
    cout << endl;
    return 0;

}
\`\`\`

### 2. 快速排序

最坏情况：$T(n)=\\Theta(n^2)$

平均情况：$T(n)=O(n\\lg n)$

\`\`\`cpp
#include <iostream>
#include <algorithm>

using namespace std;

int partition(int A[], int start, int end) {
    int x = A[end];
    int i = start - 1;
    for (int j = start; j < end; j++) {
        if (A[j] <= x) {
            i++;
            swap(A[i], A[j]);
        }
    }
    swap(A[i+1], A[end]);
    return (i + 1);
}


void quickSort(int A[], int start, int end) {
    if (start < end) {
        int mid = partition(A, start, end);
        quickSort(A, start, mid-1);
        quickSort(A, mid+1, end);
    }
}

int main() {
    int A[10] = {1, 4, 7, 2, 5, 8, 0, 3, 6, 9};
    quickSort(A, 0, 9);
    for (int i = 0; i < 10; i++)
        cout << A[i] << " ";
    cout << endl;
    return 0;
}
\`\`\`

`;export{n as default};
