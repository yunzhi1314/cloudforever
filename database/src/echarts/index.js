import { Request } from "@/hooks/Requset";
import * as echarts from "echarts";
import url from "@/api/url";
import store from '@/store';
export async function expMedicals(dom) {
	let datas = (await Request.getData(url.database.home.expMedicals)).data;
	console.log(datas.datas);
    store.commit('database/SAVE_DATA',{datas:datas.datas,key:'expMedicals'})
    store.commit('CHANGE_STORE','isExpMedicals')
	let sources = datas.datas.map((item) => ({
		medical_name: item.medical_name,
		鳞癌ORR: item.medical_ORR,
		鳞癌OS: item.medical_OS,
		非鳞癌ORR: item.medical_ORR,
		非鳞癌OS: item.medical_OS,
		company: item.company,
		medical_TREE: item.medical_TREE,
		id: item.id,
	}));
	let expMap = echarts.init(dom);

	let option = {
		title: { text: "各公司鳞癌非鳞癌使用情况" },
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
	};

	expMap.setOption(option);
}
