<template>
	<div class="wirpper" style="padding: 0">
		<!-- 查询按钮 -->
		<el-row>
			<el-col :span="7" style="padding: 1vh 0 0 1vh">
				<el-row class="nav">
					<el-input v-model="search" placeholder="请输入查询内容" style="width: 60vw" />
					<el-button @click="query" icon="search" type="primary" style="margin-left: 1vw">查询</el-button>
					<el-button @click="addTable" icon="FolderAdd" type="success">新增菜单</el-button>
				</el-row>
			</el-col>
		</el-row>
		<!-- 通过搜索控制展示的数据是搜索内容还是初始数据 -->
		<el-table :data="pageArr" style="margin-top: 3vh" height="69vh">
			<el-table-column v-for="(item, index) in propArr" :label="nameArr[index]" :prop="item" :key="index"
				:fixed="index == 0">
			</el-table-column>
			<el-table-column label="操纵">
				<template #default="scope">
					<el-button link size="small" style="margin: 0; width: 45%; color: #409eff;"
						@click="setMsg(scope.row)">修改</el-button>
					<el-button link size="small" style="margin: 0; width: 45%; color: #409eff;"
						@click="delMsg(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页栏 -->
		<div style="display: flex; justify-content: center; height:5vh;">
			<el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 8]"
				:small="false" layout="total, sizes, prev, pager, next, jumper"
				:total="isSearch ? searchData.length : dataList.length" @size-change="handleSizeChange"
				@current-change="handleCurrentChange" />
		</div>
	</div>
	<!-- 新增/修改菜单的遮罩层 -->
	<dialogPage>
		<div class="dialogMenu" @click.stop>
			<section style="display: flex; justify-content: space-between">
				<span>{{ isSearch ? "修改菜单" : "添加菜单" }}</span>
				<el-icon style="cursor: pointer" @click="controlObj.isDialog.isAddMenu = false">
					<Close />
				</el-icon>
			</section>
			<el-form :model="msgObj" :rules="rules" ref="ruleFormRef" status-icon>
				<div style="
						display: flex;
						width: 100%;
						flex-wrap: wrap;
						justify-content: space-between;
					">
					<section v-for="(item, index) in tableArr" :key="index" style="width: 21.5vw">
						<el-form-item :label="item.label" :prop="item.prop" style="width: 100%" v-if="item.prop != 'time'">
							<el-input v-model="msgObj[item.prop]"></el-input>
						</el-form-item>
						<el-form-item v-if="item.prop == 'time'" style="width: 100%" :label="item.label" :prop="item.prop">
							<el-date-picker v-model="msgObj[item.prop]" type="year" placeholder="请选择年份" />
						</el-form-item>
					</section>
				</div>
				<el-form-item style="display: flex">
					<div style="flex: 1"></div>
					<el-button type="" @click="cancel">取消</el-button>
					<el-button type="primary" @click="
						confirm(
							ruleFormRef,
							'isAddMenu',
							isSetMenu,
							msgObj,
							url.database.menu.setMenu,
							url.database.menu.addMenu
						)
						">{{ isSetMenu ? "更改" : "添加" }}</el-button>
				</el-form-item>
			</el-form>
		</div>
	</dialogPage>
</template>

<script>
import { ref, reactive, watch, provide, h } from "vue";
import menuPage from "@/public/database/menu/menuPage.scss";
import controlObj from "@/hooks/controlObj";
import { addMenu, setMenu, delMenu } from "@/api/arknight/database/menu";
// 导入弹框，删除时使用
import { ElMessage, ElMessageBox } from "element-plus";
import url from "@/api/url"

export default {
	name: "dictionaryPage",
	setup() {
		// 用户搜索的内容
		let search = ref("");
		// 是否开启了搜索
		let isSearch = ref(false);
		// 搜索内容展示
		let searchData = ref("");
		// 元数据
		let dataList = ref(
			JSON.parse(sessionStorage.getItem("medical")).naweiCompany2
		);

		dataList.value = dataList.value.map((item, index) => {
			item.year =
				index % 2 == 1
					? (2019 + index / 2).toFixed(0).toString() + "年6月"
					: (2019 + index / 2).toFixed(0).toString() + "年12月";
			return item;
		});

		// 查询
		function query() {
			// 开启搜索
			isSearch.value = true;

			// 过滤符合条件的搜索内容
			searchData.value = dataList.value.filter((item) =>
				Object.values(item).includes(search.value)
			);
			// 如果用户未输入搜索内容，内容展示为初始树数据
			if (search.value == "") {
				isSearch.value = false;
			}
		}

		// 验证表单
		let ruleMenu = ref();
		// 表单的内容
		let addMsg = reactive({});
		Reflect.ownKeys(dataList.value[0]).forEach((item) => {
			Reflect.set(addMsg, item, "");
		});

		let propArr = Reflect.ownKeys(dataList.value[0]);
		let item = propArr.pop();
		propArr.unshift(item);
		// 表单验证规则
		let rules = reactive({});
		// 标头
		let nameArr = [
			"市销率（TTM）",
			"市净率（MRQ）",
			"市盈率（LYR）",
			"市盈率（TTM）",
			"自由现金流量股息支付比率",
			"每股现金流量",
			"每股经营性现金流量",
			"每股销售收入",
			"每股净资产",
			"每股非稀释每股收益",
			"每股稀释每股收益",
			"复合年增长率",
			"稀释每股收益（完全摊薄）",
			"基本每股收益",
			"每股指标",
			"总资产周转率",
			"负债资产比率",
			"调整后的息税折旧摊销前利润率",
			"息税折旧摊销前利润率",
			"净利润率",
			"毛利润",
			"投入资本回报率",
			"总资产回报率",
			"净资产回报率（TTM）",
			"非净资产回报率",
			"ROE2",
			"ROE",
			"关键比率",
			"折旧与摊销",
			"期末余额",
			"净现金流量",
			"融资活动",
			"借款所收到的现金",
			"投资者的投资",
			"投资活动",
			"用于购买投资的现金支付",
			"购买和建造固定资产",
			"财务ID",
			"财务状态"
		];
		nameArr.unshift("年份");
		// 加入表单验证规则
		Reflect.ownKeys(addMsg).forEach((item, index) => {
			Reflect.set(rules, item, {
				required: true,
				message: `请输入${nameArr[index]}`,
				trigger: "blur"
			});
		});

		// 新增内容
		function addTable() {
			controlObj.isDialog.isAddMenu = true;

			// 打开新增的表单时，清空所有遮罩层的内容
			Reflect.ownKeys(addMsg).forEach((key) => {
				Reflect.set(addMsg, key, "");
			});
		}

		// 修改内容
		// 声明一个修改的开关
		let isSetMsg = ref(false);

		// 修改按钮的函数
		function setMsg(item) {
			// 令表格变成修改的表格，开启修改开关
			isSetMsg.value = true;

			// 将原本的内容渲染到修改的表格上来
			Reflect.ownKeys(addMsg).forEach((key) => {
				Reflect.set(addMsg, key, item[key]);
			});

			// 打开遮罩层
			controlObj.isDialog.isAddMenu = true;
		}

		// 取消遮罩层
		function cancel() {
			controlObj.isDialog.isAddMenu = false;
			isSetMsg.value = false;
		}

		// 删除提示框
		const delMsg = (item) => {
			// 这个函数本质上返回的是promise函数
			ElMessageBox({
				// 提示框标题
				title: "删除信息",
				// 提示框渲染的信息，用h函数渲染
				// h(HTMLCollaption:string,CSS:object,html内容:array | string):htmlTag
				message: h("p", null, [h("span", null, "你确认删除这项信息吗？")]),
				// 显示取消按钮
				showCancelButton: true,
				// 确认按钮的文本
				confirmButtonText: "确认",
				// 取消按钮的文本
				cancelButtonText: "取消",
				// 在关闭之前的钩子函数
				// action是指用户的行为：用户点击了哪一个按钮
				// instance 点击确认按钮后，提示框结束之前的加载动画
				// done() 确认提示框的行为有无完成的标志
				beforeClose: (action, instance, done) => {
					if (action === "confirm") {
						// 开启提示框确认按钮的加载动画
						instance.confirmButtonLoading = true;
						instance.confirmButtonText = "Loading...";
						// 在结束提示框之前去进行请求
						delMenu(url.database.dictionary.delMenu, item.id);
						setTimeout(() => {
							// 结束提示框的行为并关闭提示框
							done();
							setTimeout(() => {
								// 结束提示框确认按钮的加载动画
								instance.confirmButtonLoading = false;
							}, 300);
						}, 3000);
					} else {
						done();
					}
				}
			})
				.then(() => {
					ElMessage({
						type: "info",
						message: `删除成功`
					});
				})
				.catch((err) => console.log(err));
		};

		// 提交表单
		const submitForm = async (formEl) => {
			if (!formEl) return;
			await formEl.validate((valid, fields) => {
				if (valid) {
					controlObj.isDialog.isAddMenu = false;

					// 根据修改的开关来决定是递交修改请求还是新增内容的请求
					isSetMsg.value ? setMenu(url.database.dictionary.setMenu, addMsg) : addMenu(url.database.dictionary.addMenu, addMsg);

					// 将修改的开关关闭
					isSetMsg.value = false;
				} else {
					console.log("error submit!", fields);
				}
			});
		};

		// 分页
		let currentPage = ref(1);
		// 单页数量
		let pageSize = ref(3);
		// 分页数组
		let pageArr = ref([]);
		// 修改分页数量
		const handleSizeChange = () => {
			pageArr.value.splice(0, pageArr.value.length);
		};
		const handleCurrentChange = () => {
			pageArr.value.splice(0, pageArr.value.length);
			console.log(pageArr.value)
		};

		// 监视 currentPage(当前页) 和 pageSize(当前页所展示的数量)
		// 去截取对应位置的数组
		// 去渲染该数组
		watch(
			[currentPage, pageSize, isSearch],
			(newValue) => {
				// 是否搜索？// 如果搜索的话，就分页搜索的结果
				newValue[2]
					? pageArr.value.push(
						...searchData.value.slice(
							(newValue[0] - 1) * newValue[1],
							newValue[0] * newValue[1]
						)) // 如果没有搜索，就分页元数据
					: pageArr.value.push(
						...dataList.value.slice(
							(newValue[0] - 1) * newValue[1], newValue[0] * newValue[1]));
				console.log((newValue[0] - 1) * newValue[1]);
				console.log(newValue[0] * newValue[1]);

			},
			{ immediate: true }
		);

		provide("controlDialog", "isAddMenu");
		return {
			/* 标头 */
			nameArr,
			propArr,
			/* 样式 */
			menuPage,
			/* 搜索框内容 */
			search,
			/* 判断是否开始搜索 */
			isSearch,
			/* 修改的开关 */
			isSetMsg,
			/* 搜索框输入时筛选的数据内容 */
			searchData,
			/* 元数据 */
			dataList,
			/* 验证表单 */
			ruleMenu,
			/* 表单的内容 */
			addMsg,
			/* 表单验证规则 */
			rules,
			/* 当前页 */
			currentPage,
			/* 当前页所展示的数量 */
			pageSize,
			/* 分页数组 */
			pageArr,
			/* 按钮集合 */
			controlObj,
			/* 查询 */
			query,
			/* 修改分页数量 */
			handleSizeChange,
			/* 修改当前页数 */
			handleCurrentChange,
			/* 修改当前页数 */
			addTable,
			/* 修改按钮 */
			setMsg,
			/* 删除按钮 */
			delMsg,
			/* 提交表单 */
			submitForm,
			/* 取消按钮 */
			cancel
		};
	}
};
</script>

<style lang="scss" scoped></style>
