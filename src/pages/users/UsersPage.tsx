import React, {useEffect, useState} from 'react';
import {IUserData, useUsers} from "../../entities";
import {List, message} from 'antd';
import * as S from './UserPage.styles';
import {UserCard} from "../../entities";
import {SubmitButton} from "../../shared/ui/SubmitButton";
import {useLogout} from "../../features/auth";
import {UserModal} from "../../features/user-management";
import {ModalModes} from "../../features/user-management/model/types";

const USERS_ON_PAGE = 10;

const UsersPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalModes>('edit')

  const [user, setUser] = useState<IUserData | null>(null);

  const [ users, setUsers ] = useState<IUserData[] | undefined>(undefined);
  const { isLoading, data } = useUsers(currentPage, USERS_ON_PAGE);

  const {mutate: logout, isLoading: isLogoutLoading} = useLogout()

  const loadMoreHandler = () => {
    setCurrentPage(prev => prev + 1)
  }

  const createHandler = () => {
    setModalMode('create')
    setIsModalOpen(true)
  }

  const openModal = (user: IUserData) => {
    setIsModalOpen(true)
    setUser(user)
    setModalMode('edit')
  }

  useEffect(() => {
    if (data?.length) {
      setUsers(prev => {
        if (prev) {
          return [...prev, ...data]
        }
        return [...data]
      })
    }
  }, [data]);

  useEffect(() => {
    if (data?.length === 0) {
      setHasMore(false)
      message.info('Вы загрузили всех пользователей!')
      return
    }
    setHasMore(true)
  }, [data]);

  return (
    <>
      <S.Wrapper>
        <S.Container>
          <S.Content>
            <List
              dataSource={users}
              renderItem={user=>
                <UserCard
                  onClick={() => openModal(user)}
                  key={user.id}
                  user={user}
               />}
            >
              <S.LoadButton
                loading={isLoading}
                disabled={!hasMore}
                onClick={loadMoreHandler}
              >
                Загрузить еще
              </S.LoadButton>
            </List>
            <S.Actions>
              <SubmitButton
                onClick={createHandler}
                text={'Создать пользователя'}
              />
            </S.Actions>
          </S.Content>
          <S.Actions>
            <SubmitButton
              isLoading={isLogoutLoading}
              onClick={logout}
              text={'Выход'}
            />
          </S.Actions>
        </S.Container>
      </S.Wrapper>
      <UserModal
        mode={modalMode}
        user={user}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  )
}
export default UsersPage