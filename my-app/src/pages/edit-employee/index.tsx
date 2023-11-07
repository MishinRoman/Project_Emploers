import { useState } from "react"
import Layout from "../../componets/layout"
import { EmployeeForm } from "../../componets/emploeey-form"
import { useNavigate, useParams } from "react-router-dom"
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "../../app/services/employees"
import { Row, Spin, message } from "antd"
import { Employee } from "@prisma/client"
import { Paths } from "../../paths"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"

export const EditEmployee = () => {
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const [errorMessage, setErrorMessage] = useState("")
  const { data, isLoading } = useGetEmployeeQuery(params.id || "")
  const [editEmployee] = useEditEmployeeMutation()

  if (isLoading) {
    return <Spin>Загрузка...</Spin>
  }
  const editEmployeeHandler = async (emploeey: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...emploeey,
      }
      await editEmployee(editedEmployee).unwrap()
      navigate(`${Paths.status}/updated`)
    } catch (error) {
      const serError = error as FetchBaseQueryError
      const messageError = serError.data as Error
      const codeError = serError.status.toString()
      setErrorMessage(
        `Ошибка ${codeError} : ${
          messageError.message ?? "Неизвестная ошибка"
        } `,
      )
    }
  }

  return (
    <Layout>
      <Row align={"middle"} justify={"center"}>
        <EmployeeForm
          title="Редактировать сотрудника"
          btnText="Сохранить"
          error={errorMessage}
          employee={data}
          onFinish={editEmployeeHandler}
        ></EmployeeForm>
      </Row>
    </Layout>
  )
}
