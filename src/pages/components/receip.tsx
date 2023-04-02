import { 
    Progress,
    Spacer
 } from '@nextui-org/react'

export type ReceipType = {
    receip: string,
    status: string
  }
  
 export default function Receip(props: ReceipType) {
    const receip = props.receip
    const status = props.status

    if (status === 'loading') {
      return <>
        <Spacer y={1}></Spacer>
        <Progress 
          indeterminated
          value={30}
          color="secondary"
          status="secondary"
          css={{ width: "50%", heigth: "10px" }}
        ></Progress>
      </>
    } else 
    if (status === 'done') {
      return <>
      <pre style={{ width: "60%" }}>
        { receip }
      </pre>  
    </>
    } 
    return <></>
  }