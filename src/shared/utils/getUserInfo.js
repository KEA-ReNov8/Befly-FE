export const getUserInfo = () => {
  try {
    const myInfoStore = localStorage.getItem('myInfoStore');
    if (myInfoStore) {
      const parsed = JSON.parse(myInfoStore);
      return parsed?.state?.myInfo || null;
    }
    return null;
  } catch (error) {
    console.error('로컬스토리지 파싱 오류:', error);
    return null;
  }
};
