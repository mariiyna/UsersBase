import React, {useState} from "react";
import {IUserData} from "../../index";
import { List, Avatar } from 'antd';
import {formatData} from "../../../shared";
import {UserModal} from "../../../features/user-management";
import styled from "styled-components";

interface UserCardProps {
  user: IUserData;
}

const Wrapper = styled.div`
  .clickable-elem {
    cursor: pointer;
    transition: all .5s;
    display: inline-block;
    
    &:hover {
      transform: scale(1.08);
    }
  }
`

export const UserCard: React.FC<UserCardProps> = ({user}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const
  return (
    <Wrapper>
      <List.Item>
        <List.Item.Meta
          avatar={
          <Avatar
            src={user.avatar}
            size={'large'}
            className='clickable-elem'
            onClick={() => setIsModalOpen(true)}
          />}
          title={
          <span
            className='clickable-elem'
            onClick={() => setIsModalOpen(true)}
          >
            {user.name}
          </span>}
          description={`Зарегистрирован ${formatData(user.createdAt)}`}
        />
      </List.Item>
      <UserModal
        user={user}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Wrapper>
  )
}