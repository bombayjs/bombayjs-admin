interface DateRangeType {
  type: string;
  begin: string;
  end: string;
}

interface EventVariate {
  _id?: string;
  user_id?: string;
  project_token: string; // 项目id
  name: string; // 事件名称
  marker: string; // 标识符 圈选就是路径
  type: string; // 类型
  is_use?: 0 | 1; // 是否有效
}

interface GetEventVariateListConditions {
  project_token: string;
  name?: string;
  is_use?: 0 | 1;
}
