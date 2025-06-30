import { Table, Button, Input, Space, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import type { DataRow } from '../types';
import AddEditModal from './AddEditModal';

const DataTable = () => {
  const [data, setData] = useState<DataRow[]>(() => {
    const stored = localStorage.getItem('table-data');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('table-data', JSON.stringify(data));
  }, [data]);

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRow, setEditRow] = useState<DataRow | null>(null);

  const handleDelete = (key: string) => {
    setData(data.filter((item) => item.key !== key));
  };

  const handleEdit = (row: DataRow) => {
    setEditRow(row);
    setIsModalOpen(true);
  };

  const handleAddEdit = (row: DataRow) => {
    if (editRow) {
      setData(data.map((item) => (item.key === row.key ? row : item)));
    } else {
      setData([...data, row]);
    }
    setEditRow(null);
    setIsModalOpen(false);
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const columns: ColumnsType<DataRow> = [
    {
      title: 'Имя',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: 'Сумма',
      dataIndex: 'amount',
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Действия',
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>✏️</Button>
          <Popconfirm
            title="Удалить запись?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button danger>🗑</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          prefix={<SearchOutlined />}
        />
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Добавить
        </Button>
      </Space>

      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />

      <AddEditModal
        visible={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditRow(null);
        }}
        onSubmit={handleAddEdit}
        initialData={editRow}
      />
    </>
  );
};

export default DataTable;
