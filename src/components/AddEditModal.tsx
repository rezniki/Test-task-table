import { Modal, Form, Input, DatePicker, InputNumber } from 'antd';
import { useEffect } from 'react';
import type { DataRow } from '../types';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (data: DataRow) => void;
  initialData: DataRow | null;
}

const AddEditModal = ({ visible, onCancel, onSubmit, initialData }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        name: initialData.name,
        date: dayjs(initialData.date),
        amount: initialData.amount,
      });
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const handleFinish = (values: any) => {
    const formatted: DataRow = {
      key: initialData ? initialData.key : uuidv4(),
      name: values.name,
      date: values.date.format('YYYY-MM-DD'),
      amount: values.amount,
    };

    onSubmit(formatted);
    form.resetFields();
  };

  return (
    <Modal
      title={initialData ? 'Редактировать' : 'Добавить запись'}
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={initialData ? 'Сохранить' : 'Добавить'}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: 'Введите имя' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Дата"
          name="date"
          rules={[{ required: true, message: 'Выберите дату' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Сумма"
          name="amount"
          rules={[{ required: true, message: 'Введите число' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditModal;
