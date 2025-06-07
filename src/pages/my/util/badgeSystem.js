export const badgeSystem = (userData) => {
    const userBadge = userData.badge;

    // 뱃지 레벨이 0-7 범위를 벗어나면 기본 뱃지(lv1) 반환
    if (userBadge < 0 || userBadge > 7) {
        return 'src/shared/assets/badge/lv1.svg';
    }

    // 뱃지 레벨 0 -> lv1, 레벨 1 -> lv2, ..., 레벨 7 -> lv8
    const badgeLevel = userBadge + 1;
    
    try {
        return `src/shared/assets/badge/lv${badgeLevel}.svg`;
    } catch (error) {
        // 이미지 파일이 없을 경우 기본 뱃지 반환
        console.warn(`Badge image lv${badgeLevel}.svg not found, using default lv1`);
        return 'src/shared/assets/badge/lv1.svg';
    }
};
