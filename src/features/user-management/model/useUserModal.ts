import { notification } from 'antd/lib';
import { IUserCreateData, useAddUser, useDeleteUser, useEditUser } from '@/entities';
import { IUserModalFields } from './types';
import { useState } from 'react';
import { Form } from 'antd';
import { IUserModalProps } from '../ui/UserModal';

export const useUserModal = (data: IUserModalProps) => {
  const { mode, user, onUserCreated, onUserDeleted, onUserUpdated, setIsModalOpen } = data;

  const [newUserName, setNewUserName] = useState<string>('');
  const [newUserAvatar, setNewUserAvatar] = useState<string>('');

  const { mutate: addUser, isLoading: isUserCreating } = useAddUser();
  const { mutate: editUser, isLoading: isUserEditing } = useEditUser();
  const { mutate: deleteUser, isLoading: isUserDeliting } = useDeleteUser();

  const clearFields = () => {
    setNewUserName('');
    setNewUserAvatar('');
  };

  const [form] = Form.useForm<IUserModalFields>();

  const handleSubmit = () => {
    if (mode === 'create' && newUserName && newUserAvatar) {
      addUser(
        {
          name: newUserName,
          avatar: newUserAvatar,
        },
        {
          onSuccess: (createdUser) => {
            notification.success({
              message: `Пользователь ${createdUser.name} успешно добавлен!`,
            });
            onUserCreated(createdUser);
            setIsModalOpen(false);
            clearFields();
            form.resetFields();
          },
        },
      );
    } else if (mode === 'edit' && user) {
      const editingUser: IUserCreateData = {
        name: user.name,
        avatar: user.avatar,
      };

      if (newUserAvatar) {
        editingUser.avatar = newUserAvatar;
      }
      if (newUserName) {
        editingUser.name = newUserName;
      }

      editUser(
        { id: user.id, user: editingUser },
        {
          onSuccess: (updatedUser) => {
            notification.success({
              message: `Пользователь успешно обновлен!`,
            });
            setIsModalOpen(false);
            onUserUpdated(updatedUser);
            clearFields();
          },
        },
      );
    }
  };

  const handleDelete = () => {
    if (user) {
      deleteUser(user.id, {
        onSuccess: (deletedUser) => {
          notification.success({
            message: `Пользователь ${deletedUser.name} успешно удален!`,
          });
          setIsModalOpen(false);
          onUserDeleted(user);
        },
      });
    }
  };

  const handleCloseIcon = () => {
    if (isUserDeliting || isUserCreating || isUserEditing) {
      return;
    }
    setIsModalOpen(false);
  };

  return {
    isUserDeliting,
    isUserCreating,
    isUserEditing,
    form,
    handleSubmit,
    handleDelete,
    newUserName,
    newUserAvatar,
    setNewUserAvatar,
    setNewUserName,
    handleCloseIcon,
  };
};
