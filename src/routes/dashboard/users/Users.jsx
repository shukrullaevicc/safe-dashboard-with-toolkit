import { Table, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useUserQuery } from '../../../redux/api/userApi';
import { Loading } from '../../../utils'; // Assuming this is a loading component

const Users = () => {
  const [userData, setUserData] = useState([]);
  const { data: users, isLoading, error } = useUserQuery();

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Date Registered',
      dataIndex: 'registeredAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  useEffect(() => {
    if (users?.payload) {
      setUserData(users.payload);
    } 
    else if (!isLoading && !users) {
      notification.warning({
        message: 'No Users Found',
        description: 'There are no users available to display.',
      });
    }

    if (error) {
      notification.error({
        message: 'Error Fetching Users',
        description: error?.message || 'Failed to load user data.',
      });
    }
  }, [users, isLoading, error]);

  return (
    <>
      {isLoading ? (<Loading />) : (
        <Table
          columns={columns}
          dataSource={userData}
          rowKey={(row) => row._id}
          pagination={{ pageSize: 7 }}
        />
      )}
    </>
  );
};

export default Users;