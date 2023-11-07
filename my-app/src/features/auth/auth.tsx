import { useCurrentQuery } from "../../app/services/auth"
import { Spin, Alert } from "antd"

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery()
  if (isLoading) {
    return <Spin tip="Loading..."></Spin>
  }
  return children
}
