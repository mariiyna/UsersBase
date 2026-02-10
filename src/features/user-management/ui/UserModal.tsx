import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Form, Input, message, Modal} from 'antd';
import {SubmitButton} from "../../../shared/ui/SubmitButton";
import {IUserModalFields, ModalModes} from "../model/types";
import * as S from './UserModal.styles';
import {IUserData, useAddUser} from "../../../entities";
import {notification} from "antd/lib";
import {queryClient} from "../../../shared";

interface UserModalProps {
  user: IUserData | null;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  mode: ModalModes;
  onUserCreated: (newUser: IUserData) => void;
}

export const UserModal: React.FC<UserModalProps> = ({isModalOpen, setIsModalOpen, user, mode, onUserCreated}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm<IUserModalFields>()

  const [newUserName, setNewUserName] = useState<string>('');
  const [newUserAvatar, setNewUserAvatar] = useState<string>('');

  const {mutate: addUser, isLoading: isUserCreating} = useAddUser();

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
          setNewUserName('')
          setNewUserAvatar('')
          form.resetFields()
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
              />): (<SubmitButton
                htmlType='submit'
                text='Создать'
                isLoading={isUserCreating}
              />)}
              <SubmitButton
                onClick={handleCancel}
                htmlType='button'
                isLoading={isUserCreating}
                text='Отмена'
              />
            </div>
          </S.FormAction>
        </S.Form>
      </Modal>
    </>
  );
}