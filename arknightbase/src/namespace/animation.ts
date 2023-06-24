export namespace URL {
  export interface urlObj {
    [propName: string]: string
  }

  export interface Url {
    [propName: string]: urlObj | string
  }

  export interface NavLis{
    item:string;
    isEnter:boolean;
    top:string;
    name:string;
  }

  export interface Ball{
    left:string;
    bottom:number;
    isBallPlay:boolean;
  }
}
