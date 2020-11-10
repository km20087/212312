//import clonedeep from 'clone-deep'
import { deepClone } from '@/libs/util.js'

export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i < len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => {
  let len = Math.min(arr1.length, arr2.length)
  let i = -1
  let res = []
  while (++i < len) {
    const item = arr2[i]
    if (arr1.indexOf(item) > -1) res.push(item)
  }
  return res
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (target, arr) => {
  return target.some(_ => arr.indexOf(_) > -1)
}

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = timeStamp => {
  const timeStr = String(timeStamp)
  return timeStr.length > 10
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp, currentTime) => {
  return timeStamp < currentTime
}

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
  return num < 10 ? '0' + num : num
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
const getDate = (timeStamp, startType) => {
  const d = new Date(timeStamp * 1000)
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const date = getHandledValue(d.getDate())
  const hours = getHandledValue(d.getHours())
  const minutes = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  let resStr = ''
  if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
  else resStr = month + '-' + date + ' ' + hours + ':' + minutes
  return resStr
}

/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = timeStamp => {
  // 判断当前传入的时间戳是秒格式还是毫秒
  const IS_MILLISECOND = isMillisecond(timeStamp)
  // 如果是毫秒格式则转为秒格式
  if (IS_MILLISECOND) Math.floor(timeStamp /= 1000)
  // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
  timeStamp = Number(timeStamp)
  // 获取当前时间时间戳
  const currentTime = Math.floor(Date.parse(new Date()) / 1000)
  // 判断传入时间戳是否早于当前时间戳
  const IS_EARLY = isEarly(timeStamp, currentTime)
  // 获取两个时间戳差值
  let diff = currentTime - timeStamp
  // 如果IS_EARLY为false则差值取反
  if (!IS_EARLY) diff = -diff
  let resStr = ''
  const dirStr = IS_EARLY ? '前' : '后'
  // 少于等于59秒
  if (diff <= 59) resStr = diff + '秒' + dirStr
  // 多于59秒，少于等于59分钟59秒
  else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + '分钟' + dirStr
  // 多于59分钟59秒，少于等于23小时59分钟59秒
  else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + '小时' + dirStr
  // 多于23小时59分钟59秒，少于等于29天59分钟59秒
  else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + '天' + dirStr
  // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
  else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp)
  else resStr = getDate(timeStamp, 'year')
  return resStr
}

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent
  const isExplorer = (exp) => {
    return ua.indexOf(exp) > -1
  }
  if (isExplorer('MSIE')) return 'IE'
  else if (isExplorer('Firefox')) return 'Firefox'
  else if (isExplorer('Chrome')) return 'Chrome'
  else if (isExplorer('Opera')) return 'Opera'
  else if (isExplorer('Safari')) return 'Safari'
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * 构建树表格(菜单)
 * @param {*} list
 * @param {*} idName
 * @param {*} title
 */
export const buildMenuTableTree = (list,idName,title) => {
  if(!list) return []
  if(!list.length) return []
  const listClone = deepClone(list)
  const handle = id => {
    let arr = []
    listClone.forEach(item => {
      if(item.parentId === id) {
        const children = handle(item[idName])
        if(item.children) item.children = [].concat(item.children,children)
        else item.children = children
        item.title = item[title]
        arr.push(item)
      }
    })
    return arr
  }
  return handle(0)
}

/**
 * 构建树表格(机构)
 * @param {*} list
 * @param {*} idName
 * @param {*} title
 */
export const buildTableTree = (list,idName,title) => {
  if(!list) return []
  if(!list.length) return []
  // 循环添加
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    item['parentId'] = Number(item['primCcbinsId'])
    item.children = []
  }
  // const listClone = clonedeep(list)
  const listClone = deepClone(list)

  const handle = id => {
    let arr = []
    listClone.forEach((item,ind) => {
      // parentId idName children
      let index = listClone.findIndex(i=>{return i[idName]==item.parentId})//父级项目的索引
      item.title = item[title]
      if(index!=-1&&index!=ind){
        item.hasParent = true
        listClone[index].children.push(item) //remove
      }
    })

    return listClone.filter(i=>!i.hasParent)
  }
  return handle(440000000)
}

/**
 * 树的回显
 * @param arr  扁平数据
 * @param idName 标识key
 * @param itemId  标识
 * @param parentId  父类标识
 */
export const treeShow = (arr,idName,itemId,parentId,flag) => {
  // let temp = clonedeep(arr)
  let temp = deepClone(arr)

  flag? parentId = itemId: ''
  temp.forEach(item => {
    if(item[idName] === parentId) {
      item.selected = true
    }
    if(item[idName] === itemId) {
      item.disabled = true
    }
  })
  const handle = id => {
    temp.forEach(item => {
      if(item[idName] === id) {
        if(item.parentId!==0) {
          item.expand = true
          handle(item.parentId)
        }else
          item.expand = true
      }
    })
  }
  handle(parentId)
  return temp
}
/**
 * tree的回显
 * @param obj
 * @param id
 */
export const selectDept = function (obj,id) {
  let idStr = `"id":${id}`
  let pid = 0
  obj.forEach(item=>{
    if (item.children.length > 0){
      if(item.id===id){
        pid = item.parentId
        return
      }
      item.children.forEach(child =>{
        if(child.id===id){
          pid = child.parentId
          return
        }
      })
    }
  })

  let str = JSON.stringify(obj)
  let reg = new RegExp(idStr)
  /**其后插入selected属性，选中该节点*/
  let news = str.replace(reg, idStr + ',\"expand\": true,\"selected\":true')
  if(pid !== 0){
    let pidStr = `"id":${pid}`
    reg = new RegExp(pidStr)
    news = news.replace(reg, pidStr + ',\"expand\": true')
  }
  return JSON.parse(news);
}

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  /* eslint-disable-next-line */
  else return !keysArr1.some(key => obj1[key] != obj2[key])
}

/**
 * @param {*} str 字符串
 * @param {*} isweek 是否显示星期
 * @description 时间格式化
 * yyyy-MM-dd hh:mm:ss 星期几
 */
export const formaterTime = (str, isweek) => {
  var fmt = 'yyyy-MM-dd hh:mm:ss'
  var datetime = new Date(str)
  var o = {
    'M+': datetime.getMonth() + 1,                   // 月份
    'd+': datetime.getDate(),                        // 日
    'h+': datetime.getHours(),                       // 小时
    'm+': datetime.getMinutes(),                     // 分
    's+': datetime.getSeconds(),                     // 秒
    'q+': Math.floor((datetime.getMonth() + 3) / 3), // 季度
    'S': datetime.getMilliseconds()                  // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (datetime.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  // 是否要显示星期
  if(isweek === true) {
    var week = ['日','一','二','三','四','五','六']
    var w = week[datetime.getDay()];   // 星期
    fmt += '  星期' + w;
  }
  return fmt
}

export const transTreeData=(data,selectId)=>{
  for(let index in data){
    let item = data[index]
    item.title = item.ccbinsChnShrtnm
    if(item.ccbinsId=="111111111"){
        item.hasChild="0";
    }
    if(item.hasChild != '0'){
      item.loading = false
      item.children=[]
    }
    if(selectId&&item.ccbinsId==selectId){
      item.selected=true
    }
  }
}
export const transTreeDatas=(data,selectId)=>{
    for(let index in data){
      let item = data[index]
      item.label = item.ccbinsChnShrtnm
      if(item.ccbinsId=="111111111"){
          item.hasChild="0";
      }
      if(item.hasChild != '0'){
        item.loading = false
        item.children=[]
      }
      if(selectId&&item.ccbinsId==selectId){
        item.selected=true
      }
    }
  }

  //将返回的以“|”分隔的串转换成中文描述
export const handleData=(project,list)=>{
    let str=project.substring(project.indexOf("|")+1,project.lastIndexOf("|"));
    let arr=str.split("|");
    let newArr=[];
    list.forEach(i=>{
        arr.forEach((t,idx)=>{
            if(i.name==t){
                newArr.push(i.text);
            }
        })
    });
    return newArr.join(",");
}
//将返回的数据转换成中文描述
export const numToDesc=(list,dnum)=>{
    let tar="";
    list.forEach(i=>{
        if(i.name==dnum){
            tar=i.text;
        }
    });
    return tar;
}
