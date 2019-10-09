interface IProjectType {
  project_name: string; // 系统名称
  type: 'web' | 'wx'; // 浏览器：web  微信小程序 ：wx
  url: string; // 首页地址
  token?: string; // 唯一码
  app_id?: string; // 系统appId标识
  user_id?: string[]; // 应用所属用户ID
  create_time?: Date; // 用户访问时间
  is_use?: 0 | 1; // 是否需要统计  0：是  1：否
  slow_page_time?: number; // 页面加载页面阀值  单位：s
  slow_js_time?: number; // js慢资源阀值 单位：s
  slow_css_time?: number; // 慢加载css资源阀值  单位：S
  slow_img_time?: number; // 慢图片加载资源阀值  单位:S
  slow_ajax_time?: number; // AJAX加载阀值
  is_statisi_pages?: 0 | 1; // 是否统计页面性能信息  0：是   1：否
  is_statisi_ajax?: 0 | 1; // 是否统计页面Ajax性能资源 0：是  1：否
  is_statisi_resource?: 0 | 1; // 是否统计页面加载资源性能信息 0：是    1：否
  is_statisi_system?: 0 | 1; // 是否存储用户系统信息资源信息 0：是   1：否
  is_statisi_error?: 0 | 1; // 是否上报页面错误信息  0：是   1：否
  is_daily_use?: 0 | 1; // 是否发送日报  0：是  1：否
  daliy_list?: string[]; // 日报列表
  is_highest_use?: 0 | 1; // 是否发送pv邮件  0：是  1：否
  highest_list?: string[]; // 突破历史pv峰值时发送邮件列表
}
