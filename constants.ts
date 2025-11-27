import { TarotCard } from './types';

export const SYSTEM_INSTRUCTION_BASE = `
Role: 你是中国顶尖的玄学大师“灵机子”，精通《三命通会》、《滴天髓》、紫微斗数以及西方塔罗。
Tone: 语言风格半文半白，带有大师风范，温暖且充满智慧，但解释必须通俗易懂。
Safety: 如果用户询问具体的医疗诊断（如'我会死吗'、'我有癌症吗'）、赌博号码、非法投资建议，请委婉拒绝，并建议寻求专业人士帮助。你的回答仅供娱乐和心理疏导，不得包含确定性的灾难预测。
`;

export const TAROT_DECK_MAJOR: Omit<TarotCard, 'isReversed'>[] = [
  { name: 'The Fool', nameCN: '愚人', meaningUpright: '新的开始，冒险，天真', meaningReversed: '鲁莽，冒险，愚蠢' },
  { name: 'The Magician', nameCN: '魔术师', meaningUpright: '创造力，技能，意志力', meaningReversed: '欺骗，意志薄弱' },
  { name: 'The High Priestess', nameCN: '女祭司', meaningUpright: '直觉，潜意识，神秘', meaningReversed: '压抑情感，缺乏直觉' },
  { name: 'The Empress', nameCN: '皇后', meaningUpright: '丰饶，母性，自然', meaningReversed: '依赖，贫瘠' },
  { name: 'The Emperor', nameCN: '皇帝', meaningUpright: '权威，结构，父性', meaningReversed: '暴政，僵化' },
  { name: 'The Hierophant', nameCN: '教皇', meaningUpright: '传统，信仰，指引', meaningReversed: '叛逆，虚伪' },
  { name: 'The Lovers', nameCN: '恋人', meaningUpright: '爱情，和谐，选择', meaningReversed: '不和谐，分离' },
  { name: 'The Chariot', nameCN: '战车', meaningUpright: '胜利，意志，自律', meaningReversed: '失控，失败' },
  { name: 'Strength', nameCN: '力量', meaningUpright: '勇气，耐心，控制', meaningReversed: '软弱，自我怀疑' },
  { name: 'The Hermit', nameCN: '隐士', meaningUpright: '内省，孤独，指引', meaningReversed: '孤立，拒绝建议' },
  { name: 'Wheel of Fortune', nameCN: '命运之轮', meaningUpright: '命运，转折点，运气', meaningReversed: '厄运，抵抗改变' },
  { name: 'Justice', nameCN: '正义', meaningUpright: '公正，真理，因果', meaningReversed: '不公，偏见' },
  { name: 'The Hanged Man', nameCN: '倒吊人', meaningUpright: '牺牲，放手，新视角', meaningReversed: '停滞，无谓牺牲' },
  { name: 'Death', nameCN: '死神', meaningUpright: '结束，转变，重生', meaningReversed: '抗拒改变，停滞' },
  { name: 'Temperance', nameCN: '节制', meaningUpright: '平衡，适度，耐心', meaningReversed: '失衡，过度' },
  { name: 'The Devil', nameCN: '恶魔', meaningUpright: '束缚，物质主义，欲望', meaningReversed: '释放，打破束缚' },
  { name: 'The Tower', nameCN: '高塔', meaningUpright: '灾难，剧变，觉醒', meaningReversed: '避免灾难，恐惧改变' },
  { name: 'The Star', nameCN: '星星', meaningUpright: '希望，灵感，宁静', meaningReversed: '绝望，缺乏信心' },
  { name: 'The Moon', nameCN: '月亮', meaningUpright: '幻觉，恐惧，潜意识', meaningReversed: '混乱，误解' },
  { name: 'The Sun', nameCN: '太阳', meaningUpright: '快乐，成功，活力', meaningReversed: '悲伤，失败' },
  { name: 'Judgement', nameCN: '审判', meaningUpright: '复活，觉醒，决断', meaningReversed: '怀疑，悔恨' },
  { name: 'The World', nameCN: '世界', meaningUpright: '完成，成就，旅行', meaningReversed: '未完成，停滞' },
];