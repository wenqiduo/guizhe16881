/**
 * 与酒馆脚本「小手机壳」约定的 postMessage 协议（与 src/小手机壳/index.ts 中 MSG 一致）
 */
export const TAVERN_PHONE_MSG = {
  REQUEST_CLOSE: 'tavern-phone:request-close',
  OPENED: 'tavern-phone:opened',
  CLOSED: 'tavern-phone:closed',
  READY: 'tavern-phone:ready',
} as const;

/** 请求关闭整个小手机浮层（由壳脚本处理） */
export function postRequestCloseTavernPhone(): void {
  window.parent.postMessage({ type: TAVERN_PHONE_MSG.REQUEST_CLOSE }, '*');
}
