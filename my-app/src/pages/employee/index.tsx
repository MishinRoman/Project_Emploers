import React, { useState } from "react"
import Layout from "../../componets/layout"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} from "../../app/services/employees"
import { selectUser } from "../../features/auth/authSlice"
import { useSelector } from "react-redux"
import { Button, Descriptions, Divider, Modal, Space, Spin } from "antd"
import { Paths } from "../../paths"
import CustomButton from "../../componets/custom-button"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { ErrorMessage } from "../../componets/error-message"
import { isErrorWhithMessage } from "../../utils/is-error-whith-messege"

export const Employee = () => {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const params = useParams<{ id: string }>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data, isLoading } = useGetEmployeeQuery(params.id || "")
  const [removeEmployee] = useRemoveEmployeeMutation()
  const user = useSelector(selectUser)

  if (isLoading) {
    return <Spin>Загрузка...</Spin>
  }
  if (!data) {
    return <Navigate to={Paths.home} />
  }
  const handleDeleteEmployee = async () => {
    try {
      await removeEmployee(data.id).unwrap()
      navigate(`${Paths.status}/deleted`)
    } catch (error) {
      const maydeError = isErrorWhithMessage(error)
      if (maydeError) {
        setError(error.message)
      } else {
        setError("Неизвестная ошибка")
      }
    }
  }

  return (
    <Layout>
      <Descriptions title="Информация о сотруднике" bordered>
        <Descriptions.Item label={"Имя"} span={3}>
          {`${data.firstName} ${data.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label={"Возраст"} span={3}>
          {`${data.age} `}
        </Descriptions.Item>
        <Descriptions.Item label={"Адрес"} span={3}>
          {`${data.address} `}
        </Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <>
          <Divider orientation="left">Действие</Divider>
          <Space>
            <Link to={`${Paths.employeeEdit}/${data.id}`}>
              <CustomButton
                type="default"
                shape="round"
                icon={<EditOutlined />}
              >
                Редактировать
              </CustomButton>
            </Link>
            <CustomButton
              type="default"
              shape="round"
              danger
              onClick={() => setIsModalOpen(true)}
              icon={<DeleteOutlined />}
            >
              Удалить
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />

      <Modal
        title={"Подтвердите удаление"}
        open={isModalOpen}
        onOk={handleDeleteEmployee}
        onCancel={() => setIsModalOpen(false)}
        okText={"Подвердить"}
        cancelText={"Отмена"}
      >
        {" "}
        Вы действительно хотите удалить сотрудника?
      </Modal>
    </Layout>
  )
}
