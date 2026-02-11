import React, { useEffect, useState } from 'react';
import { IUserData, useUsers } from '@/entities';
import { List, message } from 'antd';
import * as S from './UserPage.styles';
import { UserCard } from '@/entities';
import { SubmitButton } from '@/shared/ui/SubmitButton';
import { useLogout } from '@/features/auth';
import { UserModal } from '@/features/user-management';
import { ModalModes } from '@/features/user-management/model/types';
import { Empty } from 'antd';

const USERS_ON_PAGE = 10;

const UsersPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalModes>('edit');
  const [user, setUser] = useState<IUserData | null>(null);

  const [users, setUsers] = useState<IUserData[]>([]);
  const { isLoading, data } = useUsers(currentPage, USERS_ON_PAGE);

  const { mutate: logout, isLoading: isLogoutLoading } = useLogout();

  const loadMoreHandler = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const createHandler = () => {
    setModalMode('create');
    setIsModalOpen(true);
  };

  const openModal = (user: IUserData) => {
    setIsModalOpen(true);
    setUser(user);
    setModalMode('edit');
  };

  useEffect(() => {
    if (data?.length) {
      setUsers((prev) => {
        const existingIds = new Set(prev.map((u) => u.id));
        const newUsers = data.filter((u) => !existingIds.has(u.id));
        return [...prev, ...newUsers];
      });

      if (data.length < USERS_ON_PAGE) {
        setHasMore(false);
      }
    }
  }, [data]);

  const handleUserCreated = (newUser: IUserData) => {
    setUsers((prev) => {
      if (prev.some((u) => u.id === newUser.id)) {
        return prev;
      }
      return [...prev, newUser];
    });
  };

  const handleUserUpdated = (updatedUser: IUserData) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
  };

  const handleUserDeleted = (deletedUser: IUserData) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== deletedUser.id));
  };

  useEffect(() => {
    if (data?.length === 0 && !isLoading) {
      message.info('Вы загрузили всех пользователей!');
      setHasMore(false);
    }
    setHasMore(true);
  }, [data, isLoading]);

  return (
    <>
      <S.Wrapper>
        <S.Container>
          <S.Content>
            <List
              dataSource={users}
              locale={{
                emptyText: <Empty description={'Пользователи не найдены'} />,
              }}
              renderItem={(user) => (
                <UserCard onClick={() => openModal(user)} key={user.id} user={user} />
              )}
            >
              {users.length !== 0 && (
                <S.LoadButton loading={isLoading} disabled={!hasMore} onClick={loadMoreHandler}>
                  Загрузить еще
                </S.LoadButton>
              )}
            </List>
            <S.Actions>
              <SubmitButton onClick={createHandler} text={'Создать пользователя'} />
            </S.Actions>
          </S.Content>
          <S.Actions>
            <SubmitButton isLoading={isLogoutLoading} onClick={logout} text={'Выход'} />
          </S.Actions>
        </S.Container>
      </S.Wrapper>
      <UserModal
        user={user}
        mode={modalMode}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onUserCreated={handleUserCreated}
        onUserUpdated={handleUserUpdated}
        onUserDeleted={handleUserDeleted}
      />
    </>
  );
};
export default UsersPage;
