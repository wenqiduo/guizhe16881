/**
 * ZOD Schema定义
 * 与角色卡变量结构保持一致
 */

// 规则条目定义（世界规则、区域规则、个人规则共用）
const 规则条目基础 = z.object({
  名称: z.string().prefault(''),
  效果描述: z.string().prefault(''),
  状态: z.enum(['生效中', '已归档']).or(z.string()).prefault('生效中'),
  细分规则: z.record(
    z.string(),
    z.object({
      描述: z.string().prefault(''),
      状态: z.enum(['生效中', '已归档']).or(z.string()).prefault('生效中'),
    }).prefault({})
  ).prefault({}),
  适用对象: z.string().prefault(''),
  标记: z.string().prefault(''),
});
const 规则条目 = z.intersection(规则条目基础, z.record(z.string(), z.unknown())).prefault({});

// 核心数据结构
const 核心结构 = z.object({
  世界规则: z.record(z.string(),规则条目).prefault({}),
  区域规则: z.record(z.string(), 规则条目).prefault({}),
  个人规则: z.record(z.string(), 规则条目).prefault({}),

  角色档案: z.record(
    z.string(),
    z.intersection(
      z.object({姓名: z.string().prefault('未知'),
        状态: z.enum(['出场中', '暂时退场']).or(z.string()).prefault('出场中'),
        描写: z.string().prefault(''),

        当前内心想法: z.string().prefault(''),
        性格: z.array(z.string()).transform(arr => _.uniq(arr)).prefault([]),
        性癖: z.array(z.string()).transform(arr => _.uniq(arr)).prefault([]),
        敏感部位: z.array(z.string()).transform(arr => _.uniq(arr)).prefault([]),
        隐藏性癖: z.string().prefault(''),

        身体信息: z.object({
          年龄: z.coerce.number().prefault(17),
          身高: z.coerce.number().prefault(160),
          体重: z.coerce.number().prefault(48),
          三围: z.string().prefault('未知'),
          体质特征: z.string().prefault('普通'),
        }).prefault({}),

        数值: z.object({
          好感度: z.coerce.number().transform(v => _.clamp(v, -100, 100)).prefault(0),
          性癖开发值: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
          发情值: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
        }).prefault({}),

        服饰: z.object({
          手部: z.object({
            名称: z.string().prefault('无'),
            状态: z.string().prefault('无'),
            描述: z.string().prefault(''),
          }).prefault({}),
          上衣: z.object({
            名称: z.string().prefault('无'),
            状态: z.string().prefault('无'),
            描述: z.string().prefault(''),
          }).prefault({}),
          下衣: z.object({
            名称: z.string().prefault('无'),
            状态: z.string().prefault('无'),
            描述: z.string().prefault(''),
          }).prefault({}),
          腿足: z.object({
            名称: z.string().prefault('无'),
            状态: z.string().prefault('无'),
            描述: z.string().prefault(''),
          }).prefault({}),
          内裤: z.object({
            名称: z.string().prefault('无'),
            状态: z.string().prefault('无'),
            描述: z.string().prefault(''),
          }).prefault({}),
        }).prefault({}),

        身体道具: z.object({
          乳头: z.object({
            道具名称: z.string().prefault('无'),
            状态: z.string().prefault('无'),
            描述: z.string().prefault(''),
          }).prefault({}),
          阴蒂: z.object({
            道具名称: z.string().prefault('无'),
            状态: z.string().prefault('无'),
            描述: z.string().prefault(''),
          }).prefault({}),
          阴阜: z.object({
            道具名称: z.string().prefault('无'),
            状态: z.string().prefault('无'),
            描述: z.string().prefault(''),
          }).prefault({}),
          尿道: z.object({
            道具名称: z.string().prefault('无'),
            状态: z.string().prefault('无'),
            描述: z.string().prefault(''),
          }).prefault({}),
          阴道: z.object({
            道具名称: z.string().prefault('无'),
            状态: z.string().prefault('无'),
            描述: z.string().prefault(''),
          }).prefault({}),
          肛门: z.object({
            道具名称: z.string().prefault('无'),
            状态: z.string().prefault('无'),
            描述: z.string().prefault(''),
          }).prefault({}),
        }).prefault({}),

        当前综合生理描述: z.string().prefault(''),
      }),
      z.record(z.string(), z.unknown())
    ).prefault({})
  ).prefault({}),

  元信息: z.object({
    玩家名称: z.string().prefault('玩家'),
    玩家设置: z.record(z.string(), z.unknown()).prefault({}),
    当前阶段: z.string().prefault('开局'),
    进度: z.coerce.number().prefault(1),
    最近更新时间: z.coerce.number().prefault(() => Date.now()),
  }).prefault({}),

  游戏状态: z.record(z.string(), z.unknown()).prefault({}),
}).prefault({});

export const Schema = z.intersection(
  核心结构,
  z.record(z.string(), z.unknown())
);

export type Schema = z.output<typeof Schema>;
