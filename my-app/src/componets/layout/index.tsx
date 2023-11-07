import React from "react"
import { Layout as AntLayout } from "antd"
import style from "./index.module.css"
import Header from "../header/index"

type Props = {
  children: React.ReactNode
}
export default function Layout({ children }: Props) {
  return (
    <div className={style.main}>
      <AntLayout.Content style={{ height: "100%" }}>
        <Header />
        {children}
      </AntLayout.Content>
    </div>
  )
}
