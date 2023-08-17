import { defineStore } from "pinia";
import type { CharacterStoreType } from './types/CharacterType'
import { roleData } from "@/utils/roledata";

let useCharacter = defineStore('character', {
    state(): CharacterStoreType {
        return {
            DataList: [],
            bg: [],
            city: '',
            key: '',
            character: []
        }
    },
    actions: {
        async getData(name: string) {
            if (!this.DataList[0]) this.DataList = (await roleData()).data.dataList
            let index: number = 0
            switch (name) {
                case '蒙德城':
                    index = 0; break;
                case '璃月港':
                    index = 1; break;
                case '稻妻城':
                    index = 2; break;
                case '须弥城':
                    index = 3; break;
            }
            this.city = this.DataList[index].city
            this.key = this.DataList[index].key
            this.bg = this.DataList[index].bg
            this.character = this.DataList[index].character
        }
    }
})
export default useCharacter