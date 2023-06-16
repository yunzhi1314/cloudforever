export namespace URL {
  // enum url {
  //    URL=
  // }
  
  export interface Url {
    [propName: string]:
      | {
          [propName: string]: string
        }
      | string
  }
}
