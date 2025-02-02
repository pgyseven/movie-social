// localStorage 키 이름
const NICKNAME_KEY = 'randomNickname';

/**
 * 브라우저에 저장된 닉네임이 없으면 새로 생성하고,
 * 이미 있으면 그 닉네임을 그대로 반환하는 함수
 */
export function getOrCreateNickname() {
  let nickname = localStorage.getItem(NICKNAME_KEY);

  if (!nickname) {
    // 랜덤 숫자를 붙여 User-XXX 형태로 만든다
    nickname = 'User-' + Math.floor(Math.random() * 10000);
    localStorage.setItem(NICKNAME_KEY, nickname);
  }

  return nickname;
}
