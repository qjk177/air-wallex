const createInviteUrl =
  "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth";

export interface IUserInfo {
  name: string;
  email: string;
}

export const postCreateInvite = async (params: IUserInfo) => {
  return fetch(createInviteUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  }).then((res) => res.json());
};
