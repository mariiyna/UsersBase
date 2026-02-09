import React from "react";
import {IUserData} from "../../index";
import { List, Avatar } from 'antd';
import {formatData} from "../../../shared";

interface UserCardProps {
  user: IUserData;
}

export const UserCard: React.FC<UserCardProps> = ({user}) => {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src={user.avatar} size={'large'}/>}
        title={<span>{user.name}</span>}
        description={`Зарегистрирован ${formatData(user.createdAt)}`}
      />
    </List.Item>
  )
}