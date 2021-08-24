//数组打乱算法就是洗牌算法：从最后一个数据开始往前，每次从前面随机一个位置，将两者交换，直到数组交换完毕：
export function xipai(arr: Array<any>) {
  //不能直接等于 会浅拷贝  还是会污染原数组
  const newArr = arr.concat()
  for (let i = 0; i < newArr.length; i++) {
    const j = Math.floor(Math.random() * newArr.length)
    ;[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
  }
  return newArr
}

//防抖
export function debounce(func: any, delay: number) {
  let timer: any
  return function (this: any, ...args: any) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
