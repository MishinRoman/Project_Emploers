import React from "react"
import Layout from "../../componets/layout"
import CustomButton from "../../componets/custom-button"
import { PlusCircleOutlined } from "@ant-design/icons"
import { Table } from "antd"
import { useGetAllEmployeesQuery } from "../../app/services/employees"
import { ColumnsType } from "antd/es/table"
import { Employee } from "@prisma/client"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../paths"

const columns: ColumnsType<Employee> = [
  {
    title: "Имя",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Возраст",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
  },
]

export const Employees = () => {
  const { data, isLoading } = useGetAllEmployeesQuery()
  const navigate = useNavigate()
  return (
    <Layout>
      <CustomButton
        children={"Добавить"}
        type="primary"
        onClick={() => navigate(Paths.employeeAdd)}
        icon={<PlusCircleOutlined />}
      />
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={(employee) => employee.id}
        onRow={(employee) => {
          return {
            onClick: () => {
              navigate(`${Paths.employee}/${employee.id}`)
            },
          }
        }}
      />
    </Layout>
  )
}
