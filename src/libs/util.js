import Cookies from 'js-cookie'
import config from '@/config'
import { forEach, hasOneOf, objEqual } from '@/libs/tools'

export const TOKEN_KEY = config.tokenKey
export const CCBID_KEY = config.ccbidKey
export const MOBILE_KEY = config.mobileKey
export const USER_KEY = config.userKey

// 保存token到Cookie
export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: config.cookieExpires || 1, path: '' })
}

// 保存机构ID到Cookie
export const setCcbinsId = (id) => {
  Cookies.set(CCBID_KEY, id, { expires: config.cookieExpires || 1, path: '' })
}

// 保存用户名到Cookie
export const setUserName = (username) => {
  Cookies.set(USER_KEY, username, { expires: config.cookieExpires || 1, path: '' })
}

// 保存用户手机号到Cookie
export const setMobile = (mobile) => {
  Cookies.set(MOBILE_KEY, mobile, { expires: config.cookieExpires || 1, path: '' })
}

// 获取Cookie中的token
export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

// 获取Cookie中的机构ID
export const getCcbinsId = () => {
  const token = Cookies.get(CCBID_KEY)
  if (token) return token
  else return false
}

// 获取Cookie中的手机号
export const getMobile = () => Cookies.get(MOBILE_KEY)

// 获取Cookie用户名
export const getUserName = () => Cookies.get(USER_KEY)

// 清除Cookie
export const deleteCookies= () => {
  Cookies.remove(TOKEN_KEY, { path: '' })
  Cookies.remove(USER_KEY, { path: '' })
  Cookies.remove(MOBILE_KEY, { path: '' })
  Cookies.remove(CCBID_KEY, { path: '' })
}

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}

const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true
    else return false
  } else return true
}

/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
  let res = []
  forEach(list, item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
        obj.children = getMenuByRouter(item.children, access)
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      if (showThisMenuEle(item, access)) res.push(obj)
    }
  })
  return res
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (routeMetched, homeRoute) => {
  let res = routeMetched.filter(item => {
    return item.meta === undefined || !item.meta.hide
  }).map(item => {
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: item.meta
    }
    return obj
  })
  res = res.filter(item => {
    return !item.meta.hideInMenu
  })
  return [Object.assign(homeRoute, { to: homeRoute.path }), ...res]
}

export const showTitle = (item, vm) => vm.$config.useI18n ? vm.$t(item.name) : ((item.meta && item.meta.title) || item.name)

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
  sessionStorage.tagNaveList = JSON.stringify(list)
}
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = sessionStorage.tagNaveList
  return list ? JSON.parse(list) : []
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = routers => {
  let i = -1
  let len = routers.length
  let homeRoute = {}
  while (++i < len) {
    let item = routers[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children)
      if (res.name) return res
    } else {
      if (item.name === 'home') homeRoute = item
    }
  }
  return homeRoute
}


/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  const { name, path, meta } = newRoute
  let newList = [...list]
  if (newList.findIndex(item => item.name === name) >= 0) return newList
  else newList.push({ name, path, meta })
  return newList
}
/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = () => {
  // if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access)
  // else return true
  return true
}

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access) => {
  const routePermissionJudge = (list) => {
    return list.some(item => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } else if (item.name === name) {
        return hasAccess(access, item)
      }
    })
  }

  return true//routePermissionJudge(routes)
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
  let len = tagNavList.length
  let res = false
  doCustomTimes(len, (index) => {
    if (routeEqual(tagNavList[index], routeItem)) res = true
  })
  return res
}
/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
  let res = {}
  if (list.length === 2) {
    res = getHomeRoute(list)
  } else {
    const index = list.findIndex(item => routeEqual(item, route))
    if (index === list.length - 1) res = list[list.length - 2]
    else res = list[index + 1]
  }
  return res
}


/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

/**
 * @param {Object} file 从上传组件得到的文件对象
 * @returns {Promise} resolve参数是解析后的二维数组
 * @description 从Csv文件中解析出表格，解析成二维数组
 */
export const getArrayFromFile = (file) => {
  let nameSplit = file.name.split('.')
  let format = nameSplit[nameSplit.length - 1]
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsText(file) // 以文本格式读取
    let arr = []
    reader.onload = function (evt) {
      let data = evt.target.result // 读到的数据
      let pasteData = data.trim()
      arr = pasteData.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(row => {
        return row.split('\t')
      }).map(item => {
        return item[0].split(',')
      })
      if (format === 'csv') resolve(arr)
      else reject(new Error('[Format Error]:你上传的不是Csv文件'))
    }
  })
}

/**
 * @param {Array} array 表格数据二维数组
 * @returns {Object} { columns, tableData }
 * @description 从二维数组中获取表头和表格数据，将第一行作为表头，用于在iView的表格中展示数据
 */
export const getTableDataFromArray = (array) => {
  let columns = []
  let tableData = []
  if (array.length > 1) {
    let titles = array.shift()
    columns = titles.map(item => {
      return {
        title: item,
        key: item
      }
    })
    tableData = array.map(item => {
      let res = {}
      item.forEach((col, i) => {
        res[titles[i]] = col
      })
      return res
    })
  }
  return {
    columns,
    tableData
  }
}

export const findNodeUpper = (ele, tag) => {
  if (ele.parentNode) {
    if (ele.parentNode.tagName === tag.toUpperCase()) {
      return ele.parentNode
    } else {
      return findNodeUpper(ele.parentNode, tag)
    }
  }
}

export const findNodeDownward = (ele, tag) => {
  const tagName = tag.toUpperCase()
  if (ele.childNodes.length) {
    let i = -1
    let len = ele.childNodes.length
    while (++i < len) {
      let child = ele.childNodes[i]
      if (child.tagName === tagName) return child
      else return findNodeDownward(child, tag)
    }
  }
}

export const showByAccess = (access, canViewAccess) => {
  return hasOneOf(canViewAccess, access)
}

/**
 * 自定义类型判断
 * @param {*} obj 被判断的对象
 */
export const getType = (obj) => {
	//tostring会返回对应不同的标签的构造函数
	var toString = Object.prototype.toString;
	var map = {
		'[object Boolean]': 'boolean',
		'[object Number]': 'number',
		'[object String]': 'string',
		'[object Function]': 'function',
		'[object Array]': 'array',
		'[object Date]': 'date',
		'[object RegExp]': 'regExp',
		'[object Undefined]': 'undefined',
		'[object Null]': 'null',
		'[object Object]': 'object'
	};

	if (obj instanceof Element) {
	    return 'element'
	}
	return map[toString.call(obj)];
}

/**
 * 对象深拷贝
 * @param {*} data 被拷贝对象
 */
export const deepClone = (data) => {
	var type = getType(data);
	var obj;
	if(type === 'array') {
		obj = [];
	} else if(type === 'object') {
		obj = {};
	} else {
		//不再具有下一层次
		return data;
	}
	if(type === 'array') {
		for(var i = 0, len = data.length; i < len; i++) {
			obj.push(deepClone(data[i]));
		}
	} else if(type === 'object') {
		for(var key in data) {
			obj[key] = deepClone(data[key]);
		}
	}
	return obj;
}


    /**
     * 处理下载返回数据（回调函数）
     */
    export const dealDownloadCallbackFun=(slef,fileName, res)=>{
      try {
        if (res.type == "application/json") {
          let reader = new FileReader();
          reader.readAsText(res);
          reader.onload = e => {
            let myres = JSON.parse(e.target.result);
            if (myres.status === 1) {
              slef.$notify({
                title: "提示",
                message: myres.msg,
                duration: 0
              });
            }
          };
          return;
        }
        // 处理文件流
        let blob = new Blob([res]);

        if ("download" in document.createElement("a")) {
          // 非IE下载
          let elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
        if (res.status) {
          if (res.status == 1) {
            slef.$notify.error({
              title: '下载失败',
              message: res.msg
            })
          }
        } else {
          slef.$notify.success({
            title: '下载成功'
          })
        }
      } catch (err) {
        slef.$notify.error({
          title: '下载失败'
        })
      }
    }
 /**
 * ele message提示函数
 * self 传进来的this
 * msg 内容
 * types 提示类型-成功、失败等不同类型
 */
export const msgTip=(self,msg,types)=>{
    self.$message({
        duration: 2 * 1000,
        message: msg,
        type:types,
    });
}
