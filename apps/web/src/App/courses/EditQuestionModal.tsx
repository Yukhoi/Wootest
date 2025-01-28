import React from "react";
import { Modal, Form, Input, Button, Space, Switch } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Question } from "../../models/question.model";

type EditQuestionModalProps = {
  visible: boolean;
  question: Question | null;
  onCancel: () => void;
  onSave: (updatedQuestion: Question) => void;
};

const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  visible,
  question,
  onCancel,
  onSave,
}) => {
  const [form] = Form.useForm();

  const initialValues = question
    ? {
        title: question.title,
        choices: question.choices,
      }
    : { title: "", choices: [{ text: "" }] };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (question) {
        const updatedQuestion: Question = {
          ...question,
          title: values.title,
          choices: values.choices,
        };
        onSave(updatedQuestion);
      }
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  return (
    <Modal
      title="Edit Question"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Save"
    >
      <Form
        form={form}
        autoComplete="off"
        layout="vertical"
        initialValues={initialValues}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please enter the question title" },
          ]}
        >
          <Input placeholder="Enter question title" />
        </Form.Item>

        <Form.List name="choices">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  align="baseline"
                  style={{ display: "flex", marginBottom: 8 }}
                >
                  <Form.Item
                    {...restField}
                    label="Choice Text"
                    name={[name, "text"]}
                    rules={[
                      { required: true, message: "Please enter choice text" },
                    ]}
                  >
                    <Input placeholder="Enter choice text" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Is Correct"
                    name={[name, "isCorrect"]}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  <Button
                    type="link"
                    onClick={() => remove(name)}
                    icon={<MinusCircleOutlined />}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Choice
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default EditQuestionModal;
