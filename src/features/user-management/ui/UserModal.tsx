import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {Form, Input, Modal} from 'antd';
import {SubmitButton} from "../../../shared/ui/SubmitButton";
import {IUserModalFields} from "../model/types";
import * as S from './UserModal.styles';
import {IUserData} from "../../../entities";

interface UserModalProps {
  user: IUserData | null;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const UserModal: React.FC<UserModalProps> = ({isModalOpen, setIsModalOpen, user}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm<IUserModalFields>()

  useEffect(() => {
    if (isModalOpen && user) {
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
        title="Basic Modal"
        open={isModalOpen}
        footer={[]}
        onCancel={handleCancel}
      >
        <S.Form
          name="ModalForm"
          form={form}
          preserve={false}
          // onFinish={onFinish}
          autoComplete="off"
        >
          <S.Form.Item<IUserModalFields>
            name="id"
            label='Id'
            layout="vertical"
          >
            <Input
              type='number'
              disabled
            />
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