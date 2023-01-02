import React from "react"

export type LIGHTBOX_PROPS={
    images:string[],
    name:string,
    userCurrentImage:number,
    close:(event:React.MouseEvent<HTMLOrSVGElement>)=>void
}