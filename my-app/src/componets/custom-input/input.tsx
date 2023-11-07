import { Input, Form } from "antd"
import styles from "./index.module.css"
import { LiteralUnion } from "antd/es/_util/type"
type Props = {
  name: string
  type?:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"
  placeholder?: string
}

export const CustomImput = ({ name, type = "text", placeholder }: Props) => {
  return (
    <Form.Item
      name={name}
      shouldUpdate={true}
      rules={[{ required: true, message: "Заплните поле" }]}
    >
      <Input placeholder={placeholder} type={type} />
    </Form.Item>
  )
}
