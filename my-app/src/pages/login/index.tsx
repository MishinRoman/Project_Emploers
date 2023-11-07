import { Card, Row, Form, Space, Typography, message } from "antd"
import Layout from "../../componets/layout"
import { CustomImput } from "../../componets/custom-input/input"
import { PasswordInput } from "../../componets/password-input/input"
import CustomButton from "../../componets/custom-button"
import { Link, useNavigate } from "react-router-dom"
import { Paths } from "../../paths"
import { UserData, useLoginMutation } from "../../app/services/auth"
import { isErrorWhithMessage } from "../../utils/is-error-whith-messege"
import { useState } from "react"
import { ErrorMessage } from "../../componets/error-message"

export default function Login() {
  const [loginUser, loginUserResult] = useLoginMutation()
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const onLogin = async (data: UserData) => {
    try {
      await loginUser(data).unwrap()
      navigate(Paths.home)
    } catch (err) {
      const maybeError = isErrorWhithMessage(err)
      if (maybeError) {
        setError(err.status.toString())
      }
    }
  }
  return (
    <Layout>
      <Row align="middle" justify={"center"}>
        <Card title="Войдите" style={{ width: "30rem" }}>
          <Form onFinish={onLogin}>
            <CustomImput name="email" type="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <CustomButton type="primary" htmlType="submit" children={"Войти"} />
          </Form>
          <Space direction="vertical" size={"large"}>
            <Typography.Text>
              Нет аккаута? <Link to={Paths.register}>Зарегистрируйтесь</Link>
            </Typography.Text>
            <ErrorMessage message={"Ощибка: " + error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}
