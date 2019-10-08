interface DateRangeType {
  type: string;
  begin: string;
  end: string;
}

interface EventVariate {
  user_id?: string;
  project_token: string; // 项目id
  name: string; // 事件名称
  marker: string; // 标识符 圈选就是路径
  type: string; // 类型
  is_use?: boolean; // 是否有效
}
