import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Form, Input, Modal} from 'antd';
import {SubmitButton} from "../../../shared/ui/SubmitButton";
import {IUserModalFields, ModalModes} from "../model/types";
import * as S from './UserModal.styles';
import {IUserCreateData, IUserData, useAddUser, useEditUser} from "../../../entities";
import {notification} from "antd/lib";

interface UserModalProps {
  user: IUserData | null;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  mode: ModalModes;
  onUserCreated: (newUser: IUserData) => void;
  onUserUpdated: (updatedUser: IUserData) => void;
}

export const UserModal: React.FC<UserModalProps> = ({isModalOpen, setIsModalOpen, user, mode, onUserCreated, onUserUpdated}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm<IUserModalFields>()

  const [newUserName, setNewUserName] = useState<string>('');
  const [newUserAvatar, setNewUserAvatar] = useState<string>('');

  const {mutate: addUser, isLoading: isUserCreating} = useAddUser();
  const {mutate: editUser, isLoading: isUserEditing} = useEditUser()

  const HandleSubmit = () => {
    if (mode === 'create' && newUserName && newUserAvatar) {
      addUser({
        name: newUserName,
        avatar: newUserAvatar
      }, {
        onSuccess: (createdUser) => {
          notification.success({
            message: `Пользователь ${createdUser.name} успешно добавлен!`,
          })
          onUserCreated(createdUser)
          setIsModalOpen(false)
          clearFields()
          form.resetFields()
        }
      })
    } else if (mode === 'edit' && user) {
      const editingUser: IUserCreateData = {
        name: user.name,
        avatar: user.avatar
      };

      if (newUserAvatar) {
        editingUser.avatar = newUserAvatar
      }
      if (newUserName) {
        editingUser.name = newUserName
      }

      editUser({id: user.id, user: editingUser}, {
        onSuccess: (updatedUser) => {
          notification.success({
            message: `Пользователь успешно обновлен!`,
          })
          setIsModalOpen(false)
          onUserUpdated(updatedUser)
          clearFields()
        }
      })
    }
  }

  useEffect(() => {
    if (mode === 'edit' && isModalOpen && user) {
      form.setFieldsValue({
        id: user.id,
        name: user.name,
        avatar: user.avatar
      })
    } else if (isModalOpen) {
      form.resetFields();
    }
  }, [user, isModalOpen]);


  const clearFields = () => {
    setNewUserName('')
    setNewUserAvatar('')
  }

  return (
    <>
      <Modal
        title={mode === 'edit'? 'Редактирование пользователя': 'Создание пользователя'}
        open={isModalOpen}
        footer={[]}
        onCancel={handleCancel}
      >
        <S.Form
          name="ModalForm"
          form={form}
          preserve={false}
          onFinish={HandleSubmit}
          autoComplete="off"
        >
          {mode === 'edit' && (<S.Form.Item<IUserModalFields>
            name="id"
            label='Id'
            layout="vertical"
          >
            <Input
              type='number'
              disabled
            />
          </S.Form.Item>)}
          <S.Form.Item<IUserModalFields>
            name="name"
            label='Имя'
            layout="vertical"
            rules={[{required: true, message: 'Введите имя!'}]}
          >
            <Input
              type='text'
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
          </S.Form.Item>
          <S.Form.Item<IUserModalFields>
            name="avatar"
            label='Ссылка на аватарку'
            layout="vertical"
            rules={[{required: true, message: 'Введите url аватара!'}]}
          >
            <Input
              type='url'
              value={newUserAvatar}
              onChange={(e) => setNewUserAvatar(e.target.value)}
            />
          </S.Form.Item>
          <S.FormAction>
            { mode === 'edit' && (
              <SubmitButton
                htmlType='button'
                text='Удалить'
              />)
            }
            <div></div>
            <div>
              {mode === 'edit' ? ( <SubmitButton
                htmlType='submit'
                text='Сохранить'
                isLoading={isUserEditing}
              />): (<SubmitButton
                htmlType='submit'
                text='Создать'
                isLoading={isUserCreating}
              />)}
              <SubmitButton
                onClick={handleCancel}
                htmlType='button'
                isLoading={isUserCreating || isUserEditing}
                text='Отмена'
              />
            </div>
          </S.FormAction>
        </S.Form>
      </Modal>
    </>
  );
}