import { Row } from "antd"
import { useAddEmployeeMutation } from "../../app/services/employees"
import Layout from "../../componets/layout"
import { EmployeeForm } from "../../componets/emploeey-form"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/auth/authSlice"
import { Paths } from "../../paths"
import { Employee } from "@prisma/client"
import { isErrorWhithMessage } from "../../utils/is-error-whith-messege"

export const AddEmployee = () => {
  const [addEmloyee] = useAddEmployeeMutation()
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const user = useSelector(selectUser)

  useEffect(() => {
    if (!user) {
      navigate(Paths.login)
    }
  }, [navigate, user])
  const handleAddEmployee = async (employee: Employee) => {
    try {
      await addEmloyee(employee).unwrap()
      navigate(`${Paths.status}/created`)
    } catch (error) {
      const maybeError = isErrorWhithMessage(error)
      if (maybeError) {
        setError(error.message)
      } else {
        setError("Неизвестная общибка")
      }
    }
  }

  return (
    <Layout>
      <Row align={"middle"} justify={"center"}>
        <EmployeeForm
          title="Добавить сотрудника"
          btnText="Добавить"
          onFinish={handleAddEmployee}
          error={error}
        />
      </Row>
    </Layout>
  )
}
