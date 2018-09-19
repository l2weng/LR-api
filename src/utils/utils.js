/**
 * get day 0.00.00 & day 23.59.59
 */
export function getDayFirstLastTime() {
  let curr = new Date;
  curr.setHours(0, 0, 0, 0);
  let startTime = curr.getDate();
  let endTime = startTime + 1;

  return {
    startTime: new Date(curr.setDate(startTime)).getTime(),
    endTime: new Date(curr.setDate(endTime)).getTime() - 1
  }
}

/**
 * get week fist day 0.00.00 & last day 23.59.59
 */
export function getWeekFirstLastTime() {
  let curr = new Date;
  curr.setHours(0, 0, 0, 0);
  let first = curr.getDate() - curr.getDay() + 1;
  let last = first + 7;

  return {
    first: new Date(curr.setDate(first)).getTime(),
    last: new Date(curr.setDate(last)).getTime() - 1
  }
}

/**
 * get month fist day 0.00.00 & last day 23.59.59
 */
export function getMonthFirstLastTime() {
  let date = new Date(), y = date.getFullYear(), m = date.getMonth();
  let firstDay = new Date(y, m, 1);
  let lastDay = new Date(y, m + 1, 0);

  return {
    firstDay: new Date(firstDay).getTime(),
    lastDay: new Date(lastDay.setHours(23, 59, 59, 999)).getTime(),
  }
}

/**
 * get month fist day 0.00.00 & last day 23.59.59
 */
export function getYearFirstLastTime() {
  let date = new Date(), y = date.getFullYear();
  let firstDay = new Date(y, 0, 1);
  let lastDay = new Date(y, 12, 0);

  return {
    yearFirstDay: new Date(firstDay).getTime(),
    yearLastDay: new Date(lastDay.setHours(23, 59, 59, 999)).getTime(),
  }
}

// 降序
function descSort(arg1, arg2) {
  return arg1 < arg2 ? 1 : (arg1 > arg2 ? -1 : 0);
}

// 升序
function asceSort(arg1, arg2) {
  return arg1 < arg2 ? -1 : (arg1 > arg2 ? 1 : 0);
}

/**
 * 按对象的某属性排序。结合数组的sort方法使用
 * eg: arr.sort(compare(propertyName.toString(), sortType);
 */
export function compare(property, type) {
  if (property instanceof Array) {
    return function (obj1, obj2) {
      let x = obj1[property[0]];
      let y = obj2[property[0]];
      let subX = obj1[property[1]];
      let subY = obj2[property[1]];

      if (type === 'DESC') {
        // 降序
        if (x === y) {
          return descSort(subX, subY);
        }
        return descSort(x, y);

      } else {
        // 升序
        if (x === y) {
          return asceSort(subX, subY);
        }
        return asceSort(x, y);
      }
    }

  } else if (typeof property === 'string') {
    return function (obj1, obj2) {
      let x = obj1[property];
      let y = obj2[property];
      if (type === 'DESC') {
        // 降序
        return x < y ? 1 : (x > y ? -1 : 0);
      }
      // 升序
      return x < y ? -1 : (x > y ? 1 : 0);
    }
  }

}

/**
 * 对象数组去重
 * 见 https://www.jianshu.com/p/131ca13e7f28
 */
export function unique(arr) {
  let result = {};
  let finalResult = [];
  for (let i = 0; i < arr.length; i++) {
    //因为songs[i].name不能重复,达到去重效果,且这里必须知晓"name"或是其他键名
    result[arr[i].name] = arr[i];
  }
  for (item in result) {
    finalResult.push(result[item]);
  }
  return finalResult;
}

/**
 * 获取标准数组
 * @param tasks
 * @returns {Array}
 */
export function getStandardData(tasks) {
  let standardArr = [];

  for (let i = 0; i < tasks.length; i++) {
    for (let j = 0; j < tasks[i].taskGroups.length; j++) {
      for (let k = 0; k < tasks[i].taskGroups[j].skuResult.length; k++) {

        let flag = false;

        for (let m = 0; m < standardArr.length; m++) {
          if (tasks[i].taskGroups[j].skuResult[k].name === standardArr[m].name) {
            flag = true;
            let location = standardArr[m].location && JSON.parse(standardArr[m].location) || [];
            let newLocation = tasks[i].taskGroups[j].skuResult[k].location &&
              JSON.parse(tasks[i].taskGroups[j].skuResult[k].location);

            if (newLocation) location = [...location, newLocation];
            if (tasks[i].taskGroups[j].skuResult[k].isKey === 1) standardArr[m].isKey = 1;

            standardArr[m].count = standardArr[m].count + tasks[i].taskGroups[j].skuResult[k].count;
            standardArr[m].location = JSON.stringify(location);
          }
        }

        if (!flag) standardArr.push(tasks[i].taskGroups[j].skuResult[k]);

      }
    }
  }

  return standardArr;
}


/**
 * 获取skuResult去重数组
 * @param skuResult
 * @returns {Array}
 */
export function unDuplicateResult(skuResult) {
  let standardArr = [];

  for (let i = 0; i < skuResult.length; i++) {

    let flag = false;

    for (let j = 0; j < standardArr.length; j++) {
      if (skuResult[i].name === standardArr[j].name) {
        flag = true;
        let location = standardArr[j].location && JSON.parse(standardArr[j].location) || [];
        let newLocation = skuResult[i].location && JSON.parse(skuResult[i].location);

        if (newLocation) location = [...location, newLocation];
        if (skuResult[i].isKey === 1) standardArr[j].isKey = 1;

        standardArr[j].count = standardArr[j].count + skuResult[i].count;
        standardArr[j].location = JSON.stringify(location);
      }
    }

    if (!flag) standardArr.push(skuResult[i]);

  }

  return standardArr;
}

/**
 * 'Other' 放最后且按facing数量递减排序
 * @param skuArr
 * @returns {Array}
 */
export function sortSkuResult(skuArr) {
  let otherSku = [];
  let summary = [];

  skuArr.forEach(item => {
    if (item.id === 1) {
      otherSku.push(item)
    } else {
      summary.push(item);
    }
  });
  summary = summary.sort(compare(['category', 'count'], 'DESC'));
  summary = [...summary, ...otherSku];

  return summary
}
