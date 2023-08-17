import req from "@/utils/request"

export function RoleARR() {
    req.get("api/geshin/roles").then((res) => {
        console.log("111", res);

    })
}