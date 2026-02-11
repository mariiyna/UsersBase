import {IUserData} from "@/entities";

export type IUserModalFields = Pick<IUserData, 'id' | 'name'> &
  Partial<Pick<IUserData, 'avatar'>>

export type ModalModes = 'edit' | 'create'