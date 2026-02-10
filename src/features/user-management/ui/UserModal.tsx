import React, {Dispatch, SetStateAction} from 'react';
import {Input, Modal} from 'antd';
import {SubmitButton} from "../../../shared/ui/SubmitButton";
import {IUserModalFields} from "../model/types";
import * as S from './UserModal.styles';
import {IUserData} from "../../../entities";

interface UserModalProps {
  user: IUserData;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const UserModal: React.FC<UserModalProps> = ({isModalOpen, setIsModalOpen, user}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        footer={[]}
        onCancel={handleCancel}
      >
        <S.Form
          name="basic"
          // onFinish={onFinish}
          autoComplete="off"
        >
          <S.Form.Item<IUserModalFields>
            name="id"
            label='Id'
            layout="vertical"
          >
            <Input type='number' ={user.id}/>
          </S.Form.Item>
          <S.Form.Item<IUserModalFields>
            name="name"
            label='Имя'
            layout="vertical"
          >
            <Input type='text'/>
          </S.Form.Item>
          <S.Form.Item<IUserModalFields>
            name="avatar"
            label='Ссылка на аватарку'
            layout="vertical"
          >
            <Input type='url'/>
          </S.Form.Item>
          <S.FormAction>
            <SubmitButton
              htmlType='button'
              text='Удалить'
            />
            <div>
              <SubmitButton
                htmlType='submit'
                text='Сохранить'
              />
              <SubmitButton
                onClick={handleCancel}
                htmlType='button'
                text='Отмена'
              />
            </div>
          </S.FormAction>
        </S.Form>
      </Modal>
    </>
  );
}