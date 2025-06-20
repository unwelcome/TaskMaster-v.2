export interface Group{
  id: number,
  title: string,
  password_hash: string,
  password_salt: string,
  //Group settings
  score_limit: number,
  topic_limit: number,
  group_status: 'open' | 'close',
  enable_senior: boolean ,

  created_by: number,
  created_at: Date,
  delete_at: Date, 
  //Senior accesses
  use_closed_chat: boolean,
  create_seminars: boolean,
  create_topics: boolean,
  evaluate_topics: boolean,
}

export interface GroupMember{
  id: number,
  user_id: number,
  group_id: number,
  role: 'student' | 'senior' | 'teacher',
}

export interface GroupWithRole extends Group{
  role: 'student' | 'senior' | 'teacher',
}