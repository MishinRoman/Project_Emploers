import React from "react"
import style from "./index.module.css"
import { Layout, Space, Typography } from "antd"
import { LoginOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons"

import CustomButton from "../custom-button"
import { Link } from "react-router-dom"
import { Paths } from "../../paths"

export default function Header() {
  return (
    <Layout.Header className={style.header}>
      <Space>
        <TeamOutlined className={style.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type="link">
            <Typography.Title level={4}>Сотрудники</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      <Space>
        <Link to={Paths.register}>
          <CustomButton type="default" icon={<UserOutlined />}>
            Регистрироваться
          </CustomButton>
        </Link>

        <Link to={Paths.login}>
          <CustomButton type="default" icon={<LoginOutlined />}>
            Войти
          </CustomButton>
        </Link>
      </Space>
    </Layout.Header>
  )
}
