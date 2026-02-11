import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {Input, Modal} from 'antd';
import {SubmitButton} from "../../../shared/ui/SubmitButton";
import {IUserModalFields, ModalModes} from "../model/types";
import * as S from './UserModal.styles';
import {IUserData} from "../../../entities";
import {useUserModal} from "../model/useUserModal";

export interface IUserModalProps {
  user: IUserData | null;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  mode: ModalModes;
  onUserCreated: (newUser: IUserData) => void;
  onUserUpdated: (updatedUser: IUserData) => void;
  onUserDeleted: (deletedUser: IUserData) => void;
}

export const UserModal: React.FC<IUserModalProps> = ({isModalOpen, setIsModalOpen, user, mode, onUserCreated, onUserUpdated, onUserDeleted}) => {
  const {
    isUserCreating,
    isUserEditing,
    isUserDeliting,
    form,
    handleSubmit,
    handleDelete,
    newUserAvatar,
    newUserName,
    setNewUserName,
    setNewUserAvatar,
    handleCloseIcon
  } = useUserModal({mode, user, onUserCreated, onUserUpdated, onUserDeleted, setIsModalOpen, isModalOpen});

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
        closable={false}
      >
        <S.CloseIcon onClick={handleCloseIcon}/>
        <S.Form
          name="ModalForm"
          form={form}
          preserve={false}
          onFinish={handleSubmit}
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
                isLoading={isUserDeliting}
                isDisabled={isUserEditing}
                onClick={handleDelete}
              />)
            }
            <div></div>
            <div>
              {mode === 'edit' ? (
              <SubmitButton
                htmlType='submit'
                text='Сохранить'
                isLoading={isUserEditing}
                isDisabled={isUserDeliting}
              />):
              (<SubmitButton
                htmlType='submit'
                text='Создать'
                isLoading={isUserCreating}
              />)}
              <SubmitButton
                onClick={() => setIsModalOpen(false)}
                htmlType='button'
                isDisabled={isUserCreating || isUserDeliting || isUserEditing}
                isLoading={isUserEditing }
                text='Отмена'
              />
            </div>
          </S.FormAction>
        </S.Form>
      </Modal>
    </>
  );
}