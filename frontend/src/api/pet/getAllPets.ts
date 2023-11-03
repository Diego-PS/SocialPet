// getAllPets.ts

import api from '..';

export interface GetAllPetsResBody {
  pets: IPet[];
}

export interface IPet {
  name: string;
  nickname: string;
  createdUTCDateTime: string;
  profilePictureUrl: string;
}

export const getAllPets = async (): Promise<{ data: GetAllPetsResBody }> => {
  return await api.get('/pet/get', {});
};
