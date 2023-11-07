import { Employee } from "@prisma/client"
import { Form, Space } from "antd"
import Card from "antd/es/card/Card"
import { CustomImput } from "../custom-input/input"
import { ErrorMessage } from "../error-message"
import CustomButton from "../custom-button"

type Props<T> = {
  onFinish: (value: T) => void
  btnText: string
  title: string
  error?: string
  employee?: T
}
export const EmployeeForm = ({
  onFinish,
  title,
  error,
  btnText,
  employee,
}: Props<Employee>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="employee-form" onFinish={onFinish} initialValues={employee}>
        <CustomImput type="text" name="firstName" placeholder="Имя" />
        <CustomImput type="text" name="lastName" placeholder="Фамилия" />
        <CustomImput type="number" name="age" placeholder="Возраст" />
        <CustomImput type="text" name="address" placeholder="Адрес" />
        <Space>
          <ErrorMessage message={error} />
          <CustomButton htmlType="submit" type="default">
            {btnText}
          </CustomButton>
        </Space>
      </Form>
    </Card>
  )
}
