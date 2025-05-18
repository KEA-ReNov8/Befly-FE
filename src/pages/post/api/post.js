// 실제 API 연동 시 활용될 POST 요청 함수 예시
export const createFreePost = async ({ title, content }) => {
  try {
    const res = await fetch('/api/free-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (!res.ok) {
      throw new Error('Failed to post');
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
