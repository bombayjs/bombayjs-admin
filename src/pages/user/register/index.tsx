import React from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Form, Icon, Input, Button, message } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import Link from 'umi/link';
import { RegisterDao } from '@/services/login';
import router from 'umi/router';

import styles from './style.less';

interface RegisterProps {
  form: FormComponentProps['form'];
}

class Register extends React.Component<RegisterProps> {
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const result = await RegisterDao({
          userName: values.userName,
          password: values.password,
        });
        console.log(result);
        if (result && result.code === 200) {
          message.success('登录成功', 1, () => {
            router.push('/user/login');
          });
        } else {
          message.error(result.msg);
        }
      }
    });
  };

  handleConfirmBlur = (e: any) => {
    const { value } = e.target;
    this.setState({ confirmDirty: !!value });
  };

  compareToFirstPassword = (_rule: any, value: any, callback: any) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (_rule: any, value: any, callback: any) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your Password!' },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Confirm Password"
              onBlur={this.handleConfirmBlur}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
            注册
          </Button>
          <Link className={styles.register} to="/user/login">
            <FormattedMessage id="user-register.register.login" />
          </Link>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegister = Form.create({ name: 'register' })(Register);

export default WrappedRegister;
