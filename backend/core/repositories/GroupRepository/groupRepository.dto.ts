export interface CreateGroupRepositoryDto{
  title: string,
  password_hash: string,
  password_salt: string,
  created_by: number,
  delete_at: Date | null,
}

export interface UpdateGroupPasswordRepositoryDto{
  id: number,
  password_hash: string,
  password_salt: string,
}

export interface UpdateGroupTitleRepositoryDto{
  id: number,
  title: string,
}

export interface UpdateGroupSettingsRepositoryDto{
  id: number,
  //Group settings
  score_limit: number,
  topic_limit: number,
  group_status: 'open' | 'close',
  enable_senior: boolean ,
  //Senior accesses
  use_closed_chat: boolean,
  create_seminars: boolean,
  create_topics: boolean,
  evaluate_topics: boolean,
}

export interface GetGroupWithRoleRepositoryDto{
  user_id: number,
  group_id: number,
}