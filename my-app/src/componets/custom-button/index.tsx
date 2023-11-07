import { Button, Form } from "antd"
import style from "./index.module.css"

type Props = {
  children: React.ReactNode
  htmlType?: "button" | "submit" | "reset" | undefined
  onClick?: () => void
  type: "link" | "text" | "default" | "primary" | "dashed" | undefined
  danger?: boolean
  loading?: boolean
  shape?: "default" | "circle" | "round"
  icon?: React.ReactNode
}

export default function CustomButton({
  onClick,
  type,
  danger,
  children,
  htmlType = "button",
  loading,
  icon,
  shape,
}: Props) {
  return (
    <Form.Item>
      <Button
        className={style.button}
        danger={danger}
        type={type}
        htmlType={htmlType}
        loading={loading}
        icon={icon}
        onClick={onClick}
        shape={shape}
      >
        {children}
      </Button>
    </Form.Item>
  )
}
