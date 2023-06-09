import { Request } from "@/hooks/Requset";
import * as echarts from "echarts";
import url from "@/api/url";
import store from '@/store';

export async function expMedicals(dom) {
	let datas = (await Request.getData(url.database.home.expMedicals)).data;
    store.commit('database/SAVE_DATA',{datas:datas.datas,key:'expMedicals'})
    store.commit('CHANGE_STORE','isExpMedicals')
	let sources = datas.datas.map((item) => ({
		medical_name: item.medical_name,
		鳞癌ORR: item.medical_indications == '鳞癌'? 
		(item.medical_ORR=='/'?'':
		item.medical_ORR.includes('%') ? item.medical_ORR.slice(0,item.medical_ORR.indexOf('%')):item.medical_ORR ):'',
		鳞癌OS: item.medical_indications == '鳞癌'? (item.medical_OS=='/'?'':item.medical_OS):'',
		非鳞癌ORR: item.medical_indications == '非鳞癌'? (item.medical_ORR=='/'?'':
		item.medical_ORR.includes('%') ? item.medical_ORR.slice(0,item.medical_ORR.indexOf('%')):item.medical_ORR ):'',
		非鳞癌OS: item.medical_indications == '非鳞癌'? (item.medical_OS=='/'?'':item.medical_OS):'',
		company: item.company,
		medical_TREE: item.medical_TREE,
		id: item.id,
	}));
	console.log(sources);
	let expMap = echarts.init(dom);

	let option = {
		title: { text: "各公司鳞癌非鳞癌使用情况" },
		tooltip:{},
		legend:{right:10,},
		// grid:{left:30},
		dataset: {
			dimensions: [
				"medical_name",
				"鳞癌ORR",
				"鳞癌OS",
				"非鳞癌ORR",
				"非鳞癌OS",
				"company",
				"medical_TREE",
				"id",
			],
			source: sources,
		},
		xAxis:{
			type:'category',
			// 显示所有x轴信息
			// axisLabel:{interval:0}
		},
		yAxis:[
			{
				type:'value',
				min:0,
				max:100
			},
			{
				type:'value',
				min:0,
				max:100
			},
		],
		series:[
			{
				name:'鳞癌ORR',
				yAxisIndex:0,
				type:'line'
			},
			{
				name:'鳞癌OS',
				yAxisIndex:0,
				type:'line'
			},
			{
				name:'非鳞癌ORR',
				yAxisIndex:1,
				type:'line'
			}
			,
			{
				name:'非鳞癌OS',
				yAxisIndex:1,
				type:'line'
			}
		]
	};

	expMap.setOption(option);
}

export async function basicMedical(){
	let datas = (await Request.getData(url.database.home.basicMedical)).data;
    store.commit('database/SAVE_DATA',{datas:datas.datas,key:'basicMedical'})
    store.commit('CHANGE_STORE','isBasicMedical')
	
}
