export function handleRoutes(arr, index) {
	// 递归
	if (index < 0) {
		return arr;
	} else {
		arr[index].component = asyncComponent(arr[index].component);
		return handleRoutes(arr, index - 1);
	}
}

function asyncComponent(path) {
	return () => import(`@/views/${path}`);
}

// 处理嵌套路由
export function dealpaths(routes, index, name, newArr = []) {
	// 停止递归条件
	if (index > routes.length - 1) {
		return [...new Set(newArr)];
	} else {
		// 判断第一层，是否有路由信息
		if (Reflect.has(routes[index], name)) {
			newArr.push(routes[index]);
			// 第一项递归完，递归下一项
			return dealpaths(routes, index + 1, name, newArr);
		} else if (routes[index].children && routes[index].children.length > 0) {
			// 有孩子，处理孩子
			newArr.push(...dealpathsChildren(routes[index].children, newArr, name));
			// 这一项递归完，继续递归下一项
			return dealpaths(routes, index + 1, name, newArr);
		}
		// 为达到结束条件
		return dealpaths(routes, index + 1, name, newArr);
	}
}

function dealpathsChildren(routes, newArr, name, index2 = 0) {
	if (routes[index2]) {
		// 有数据，处理路由，会出现很多重复的，因为每轮递归都会添加
		newArr.push(...routes.filter((item) => Reflect.has(item, name)));
		// 判断有无孙子
		if (routes[index2].children) {
			// 设置锚点，标记已经遍历过这个子代
			routes[index2].hasForEach = true;
			// 在将孙子丢入递归
			return dealpathsChildren(routes[index2].children, newArr, name);
		} else {
			// 没有孙子，继续递归处理路由
			return dealpathsChildren(routes, newArr, name, index2 + 1);
		}
	} else {
		// 没有数据了，返回去重的数组
		return [...new Set(newArr)];
	}
}
