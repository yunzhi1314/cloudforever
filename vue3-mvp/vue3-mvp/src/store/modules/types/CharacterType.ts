export interface CVDataType {
    name: string,// cv姓名
    audio: string[],// 音频
}

export interface CharacterType {
    title?: string,// 人物名称
    avatar?: string,// 人物头像图片路径
    name: string,// 人物名称图片
    roleImg: string,// 人物立绘
    attr: string,// 人物徽标
    sentence: string,// 人物句子图片
    introduce: string,// 人物介绍
    cv: CVDataType[]
}

export interface DataListType {
    city: string,
    key: string,
    bg: string[],
    character: CharacterType[]
}

export interface CharacterStoreType extends DataListType {
    DataList: DataListType[],
}