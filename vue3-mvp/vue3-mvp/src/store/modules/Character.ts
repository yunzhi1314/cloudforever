import { defineStore } from "pinia";
import type { CharacterType } from './types/CharacterType'

let useCharacter = defineStore('character', {
    state(): CharacterType {
        return {
            characterList: [
                {
                    charName: '琴',
                },
                {
                    charName: '安柏'
                },
                {
                    charName: '丽莎'
                },
                {
                    charName: '芭芭拉'
                },
                {
                    charName: '温迪'
                },
                {
                    charName: '可莉'
                },
                {
                    charName: '诺艾尔'
                },
                {
                    charName: '菲谢尔'
                },
                {
                    charName: '砂糖'
                },
                {
                    charName: '莫娜'
                },
                {
                    charName: '迪奥娜'
                },
                {
                    charName: '阿贝多'
                },
                {
                    charName: '罗莎莉亚'
                },
                {
                    charName: '优菈'
                },
                {
                    charName: '米卡'
                },
                {
                    charName: '班尼特'
                },
                {
                    charName: '雷泽'
                },
                {
                    charName: '埃洛伊'
                },
                {
                    charName: '迪卢克'
                },
                {
                    charName: '凯亚'
                },
            ],
        }
    },
    actions: {
        getData(): void {
            for (let i = 1; i <= 20; i++) {
                Object.assign(this.characterList[i - 1], {
                    'avatar': `src/assets/imgs/avatar/${i}.png`,
                })
            }
            console.log(this.characterList);
        }
    }
})
export default useCharacter