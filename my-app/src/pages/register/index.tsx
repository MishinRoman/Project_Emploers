import { Card, Row, Form, Space, Typography } from "antd"
import Layout from "../../componets/layout"
import { CustomImput } from "../../componets/custom-input/input"
import { PasswordInput } from "../../componets/password-input/input"
import CustomButton from "../../componets/custom-button"
import { Link, useNavigate } from "react-router-dom"
import { Paths } from "../../paths"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/auth/authSlice"
import { useState } from "react"
import { UserData, useRegisterMutation } from "../../app/services/auth"
import { User } from "@prisma/client"

type RegisterData = Omit<User, "id"> & { comfirmPassword: string }
export default function register() {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const [error, setError] = useState("")
  const [register] = useRegisterMutation()
  const registerUser = async (data: RegisterData) => {
    try {
      await register(data).unwrap()
      navigate(Paths.home)
    } catch (error) {
      setError((error as Error).message)
    }
  }
  return (
    <Layout>
      <Row align="middle" justify={"center"}>
        <Card title="Зарегистрируетесь" style={{ width: "30rem" }}>
          <Form onFinish={registerUser}>
            <CustomImput name="name" type="text" placeholder="Имя" />
            <CustomImput name="email" type="email" placeholder="Email" />

            <PasswordInput name="password" placeholder="Пароль" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Повторите пароль"
            />

            <CustomButton
              type="primary"
              htmlType="submit"
              children={"Зарегистрироваться"}
            />
          </Form>
          <Space direction="vertical" size={"large"}>
            <Typography.Text>
              Есть аккаут? <Link to={Paths.login}>Войдите</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}
