export interface CharacterListType {
    title?: string,// 人物名称
    avatar?: string,// 人物头像图片路径
}

export interface CharacterType {
    characterList: CharacterListType[]
}