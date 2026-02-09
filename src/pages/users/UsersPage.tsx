import React, { useState } from 'react';import {IUserData} from "../../entities";
import { List } from 'antd';
import * as S from './UserPage.styles';
import {UserCard} from "../../entities";
import {SubmitButton} from "../../shared/ui/SubmitButton";
import type { PaginationProps } from 'antd';

const users: IUserData[] = [
  {
    "createdAt": "2026-02-08T11:50:02.175Z",
    "name": "Matthew Keeling",
    "avatar": "https://avatars.githubusercontent.com/u/69655440",
    "id": "1"
  },
  {
    "createdAt": "2026-02-08T08:16:39.077Z",
    "name": "Dr. Karl Batz-Rosenbaum",
    "avatar": "https://avatars.githubusercontent.com/u/5245463",
    "id": "2"
  },
  {
    "createdAt": "2026-02-08T13:02:15.525Z",
    "name": "Wallace Marquardt",
    "avatar": "https://avatars.githubusercontent.com/u/26856723",
    "id": "3"
  },
  {
    "createdAt": "2026-02-08T16:49:43.085Z",
    "name": "Steven Price Sr.",
    "avatar": "https://avatars.githubusercontent.com/u/27839795",
    "id": "4"
  },
  {
    "createdAt": "2026-02-08T11:50:02.175Z",
    "name": "Matthew Keeling",
    "avatar": "https://avatars.githubusercontent.com/u/69655440",
    "id": "1"
  },
  {
    "createdAt": "2026-02-08T08:16:39.077Z",
    "name": "Dr. Karl Batz-Rosenbaum",
    "avatar": "https://avatars.githubusercontent.com/u/5245463",
    "id": "2"
  },
  {
    "createdAt": "2026-02-08T13:02:15.525Z",
    "name": "Wallace Marquardt",
    "avatar": "https://avatars.githubusercontent.com/u/26856723",
    "id": "3"
  },
  {
    "createdAt": "2026-02-08T16:49:43.085Z",
    "name": "Steven Price Sr.",
    "avatar": "https://avatars.githubusercontent.com/u/27839795",
    "id": "4"
  },
  {
    "createdAt": "2026-02-08T11:50:02.175Z",
    "name": "Matthew Keeling",
    "avatar": "https://avatars.githubusercontent.com/u/69655440",
    "id": "1"
  },
  {
    "createdAt": "2026-02-08T08:16:39.077Z",
    "name": "Dr. Karl Batz-Rosenbaum",
    "avatar": "https://avatars.githubusercontent.com/u/5245463",
    "id": "2"
  },
  {
    "createdAt": "2026-02-08T13:02:15.525Z",
    "name": "Wallace Marquardt",
    "avatar": "https://avatars.githubusercontent.com/u/26856723",
    "id": "3"
  },
  {
    "createdAt": "2026-02-08T16:49:43.085Z",
    "name": "Steven Price Sr.",
    "avatar": "https://avatars.githubusercontent.com/u/27839795",
    "id": "4"
  },
]

const TOTAL_PAGE_COUNT: number = 50;
const USERS_ON_PAGE: number = 5;

export const UsersPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onChangePage: PaginationProps['onChange'] = (page) => setCurrentPage(page);

  return (
    <S.Wrapper>
      <S.Container>
        <S.Content>
          <List
            dataSource={users}
            renderItem={user =>
              <UserCard
                key={user.id}
                user={user}
             />}
            // pagination={{
            //   current: currentPage,
            //   onChange: onChangePage,
            //   total: totalPageCount,
            //   position: 'bottom',
            //   align: 'start',
            //   pageSize: 5,
            // }}
          >
          </List>
          <S.Actions>
            <SubmitButton text={'Создать пользователя'}/>
          </S.Actions>
        </S.Content>
        <div>
          <SubmitButton text={'Выход'}/>
        </div>
      </S.Container>
      <S.StyledPagination
        current={currentPage}
        onChange={onChangePage}
        total={TOTAL_PAGE_COUNT}
      />
    </S.Wrapper>
  )
}