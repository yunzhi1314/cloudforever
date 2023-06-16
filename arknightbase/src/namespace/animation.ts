export namespace URL {
  export interface urlObj {
    [propName: string]: string
  }
  

  export interface Url {
    [propName: string]: urlObj | string
  }
}
