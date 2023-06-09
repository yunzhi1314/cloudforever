import { Request } from "@/hooks/Requset";
import * as echarts from "echarts";
import url from "@/api/url";
import store from '@/store';

// 折线图
export async function expMedicals(dom) {
	let datas = (await Request.getData(url.database.home.expMedicals)).data;
    store.commit('database/SAVE_DATA',{datas:datas.datas,key:'expMedicals'})
    store.commit('CHANGE_STORE','isExpMedicals')
	function paramsStr(str){
		return str.includes('%') ?  str.slice(0,str.indexOf('%')): str
	}
	let sources = datas.datas.map((item) => ({
		medical_name: item.medical_name,
		鳞癌ORR: item.medical_indications == '鳞癌'? 
		(item.medical_ORR=='/'? '': paramsStr(item.medical_ORR)) : '',
		鳞癌OS: item.medical_indications == '鳞癌'? 
		(item.medical_OS=='/'? '': paramsStr(item.medical_OS)) : '',
		非鳞癌ORR: item.medical_indications == '非鳞癌'? (item.medical_ORR=='/'? '': paramsStr(item.medical_ORR)) : '',
		非鳞癌OS: item.medical_indications == '非鳞癌'? (item.medical_OS=='/'? '': paramsStr(item.medical_OS)) : '',
		company: item.company,
		medical_TREE: item.medical_TREE=='/'? '' : item.medical_TREE,
		id: item.id,
	}));
	let expMap = echarts.init(dom);
	let option = {
		title: { text: "各公司鳞癌非鳞癌使用情况" },
		tooltip:{
			formatter:function(params){
				console.log(params);
				return `
				<div class="label">
            <section><span>公司:</span> ${params.data.company}</section>
		<section><span>TREE:</span> ${params.data.medical_TREE}</section>
		<section><span>${params.seriesName}:</span> ${params.data[params.seriesName]}%</section>
        </div>`
			}
		},
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

// 饼状图
export async function basicMedical(dom){
	let datas = (await Request.getData(url.database.home.basicMedical)).data;
	let source = datas.datas
    store.commit('database/SAVE_DATA',{datas:datas.datas,key:'basicMedical'})
    store.commit('CHANGE_STORE','isBasicMedical')
	let echart = echarts.init(dom)
	let company = [...new Set(source.map(item=>item.medical_company))]
	let sources = []
	function cases(item,index){
		if(sources[index] == undefined){
			sources.push({
				name:item.medical_company,
				value:0
			})
		}
		sources[index].value++
	}
	source.forEach(item=>{
		company.forEach((el,index2)=>{
			switch(el){
				case item.medical_company:
					cases(item,index2)
					break
			}
		})
	})

	let option = {
		title:{text:'各公司药物药物种类数量占比',top:15,left:10},
		legend:{
			orient:'vertical',
			right:10,
			top:'center'
		},
		series:{
			name: '药物数量占比',
			data:sources,
			type:'pie',
			radius:['65%','55%'],
			left:-100,
			bottom:-50,
			avoidLabelOverlap:true,
			itemStyle:{
				borderColor: '#fff',
        borderWidth: 2
			},
			label:{
				show:false,
				position:'center'
			},
			emphasis:{
				label:{
					show:true,
					formatter:`{b}:{c}款 占比{d}%`,
					fontSize: '20',
					fontWeight: 'bold',
					left:'center',
					top:'center'
				}
			},
			labelLine:{
				show:false
			}
		}
	}

	echart.setOption(option)
}

export async function naweiCompany(dom){
	let datas = (await Request.getData(url.database.home.naweiCompany)).data;
	let source = datas.datas
    store.commit('database/SAVE_DATA',{datas:datas.datas,key:'naweiCompany'})
    store.commit('CHANGE_STORE','isNaweiCompany')
	console.log(source);

	let echart = echarts.init(dom)
	let option = {
		title:{text:'各公司药物药物种类数量占比',top:15,left:10},
	}
	echart.setOption(option)
}