import React from 'react';
import { Drawer, Button, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';

interface IProps {
  name: string;
  marker: string;
  form: FormComponentProps['form'];
  visible: boolean;
  onClose: () => void;
  handleSubmit: (values) => void;
}

const EventVariateForm: React.FC<IProps> = props => {
  const { getFieldDecorator, getFieldsError } = props.form;
  const { name, marker, visible, onClose, handleSubmit } = props;

  const hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field]);

  function submit(e) {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        props.form.resetFields();
        handleSubmit(values);
      }
    });
  }

  return (
    <Drawer title="定义元素" placement="right" closable onClose={onClose} visible={visible}>
      <Form onSubmit={submit}>
        <Form.Item label="元素名称">
          {getFieldDecorator('name', {
            initialValue: name,
            rules: [{ required: true, message: '请输入元素名称!', type: 'string' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="标识符">
          {getFieldDecorator('marker', {
            initialValue: marker,
          })(<Input />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            保存
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default Form.create()(EventVariateForm);
