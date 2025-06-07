import lv1 from '@shared/assets/badge/lv1.svg';
import lv2 from '@shared/assets/badge/lv2.svg';
import lv3 from '@shared/assets/badge/lv3.svg';
import lv4 from '@shared/assets/badge/lv4.svg';
import lv5 from '@shared/assets/badge/lv5.svg';
import lv6 from '@shared/assets/badge/lv6.svg';
import lv7 from '@shared/assets/badge/lv7.svg';
import lv8 from '@shared/assets/badge/lv8.svg';

const badgeImages = {
    0: lv1,
    1: lv2,
    2: lv3,
    3: lv4,
    4: lv5,
    6: lv6,
    7: lv7,
    8: lv8,
};

export const badgeSystem = (userBadge) => {
    try {
        console.log(badgeImages[userBadge]);
        return badgeImages[userBadge];
    } catch (error) {
        // 이미지 파일이 없을 경우 기본 뱃지 반환
        console.warn(`Badge image lv${userBadge}.svg not found, using default lv1`);
        return badgeImages[1];
    }
};
