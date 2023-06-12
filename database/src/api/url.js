export default {
	database:{
		layout:{
			menu:'/database/layout/menu'
		},
		home:{
            messages:"/database/home/messages",
            expMedicals:"/database/home/expMedicals",
			basicMedical:'/database/home/basicMedical',
			navTools:'/database/home/navTools',
			naweiCompany:'/database/home/naweiCompany',
			naweiCompany2:'/database/home/naweiCompany2'
        },
		menu:{
			addMenu:"/database/menu/addMedical",
			setMenu:"/database/menu/setMedical",
            delMenu:"/database/menu/delMedical"
		},
		role:{
            addMenu:"/database/role/addMedical",
			setMenu:"/database/role/setMedical",
            delMenu:"/database/role/delMedical"
        },
		user:{
            queryMedicals:"database/home/expMedical",
			addMenu:"/database/user/addMedical",
			setMenu:"/database/user/setMedical",
            delMenu:"/database/user/delMedical"
        }
	}
};