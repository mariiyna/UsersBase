import React from 'react';
import { IUserData } from '@/entities';
import { List, Avatar } from 'antd';
import { formatData } from '@/shared';
import styled from 'styled-components';

interface UserCardProps {
  user: IUserData;
  onClick: (user: IUserData) => void;
}

const Wrapper = styled.div`
  .clickable-elem {
    cursor: pointer;
    transition: all 0.5s;
    display: inline-block;

    &:hover {
      transform: scale(1.08);
    }
  }
`;

export const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <Wrapper>
      <List.Item>
        <List.Item.Meta
          avatar={
            <Avatar
              src={user.avatar}
              size={'large'}
              className="clickable-elem"
              onClick={() => onClick(user)}
            />
          }
          title={
            <span className="clickable-elem" onClick={() => onClick(user)}>
              {user.name}
            </span>
          }
          description={`Зарегистрирован ${formatData(user.createdAt)}`}
        />
      </List.Item>
    </Wrapper>
  );
};
