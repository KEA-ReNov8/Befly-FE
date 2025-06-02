import styled from 'styled-components';
import theme from '@app/styles/theme';
import TopBar from '@shared/ui/TopBar/TopBar';
import Report from '@report/components/Report';

export const ReportPage = () => {
    // 목업 데이터 생성
    const mockReportData = {
        title: '오늘 친구랑 싸웠는데 너무 힘드네...오늘 친구랑 싸웠는데 너무 힘드네...오늘...',
        createdAt: '2023-08-15T09:30:00.000Z',
        analysisData: {
          summary: '비플라이 님은 공감 능력과 자기이해 수준이 높으며, 감정 조절 및 대인 관계에서 안정적인 태도를 보이고 있습니다.',
          details:
            '특히 공감 능력과 자아 성찰 능력에서 높은 수준을 보이며, 자신의 감정을 인식하고 표현하는 데 익숙합니다. 다만 불안 수준이 평균보다 다소 높은 편으로 나타났으며, 일상 스트레스나 압박 상황에서 긴장을 경험하는 경향이 있습니다. 이와 관련한 스트레스 완화 전략과 자기돌봄 방법이 도움이 될 수 있습니다.'
        },
        scores: [
          { title: '불안', value: 92, maxValue: 100, content: '불안 완화 전략 실천, 자기돌봄 루틴 만들기,불안 완화 전략 실천불안 완화 전략 실천불안 완화 전략 실천불안 완화 전략 실천' },
          { title: '상처', value: 88, maxValue: 100, content: '불안 완화 전략 실천, 자기돌봄 루틴 만들기,불안 완화 전략 실천불안 완화 전략 실천불안 완화 전략 실천불안 완화 전략 실천' },
          { title: '스트레스', value: 78, maxValue: 100, content: '불안 완화 전략 실천, 자기돌봄 루틴 만들기,불안 완화 전략' },
          { title: '학업', value: 85, maxValue: 100, content: '불안 완화 전략 실천, 자기돌봄 루틴 만들기,불안 완화 전략 실천불안 완화 전략 실천불안 완화 전략 실천불안 완화 전략 실천' },
          { title: '외로움', value: 72, maxValue: 100, content: '불안 완화 전략 실천, 자기돌봄 루틴 만들기,불안 완화 전략 실천불안 완화 전략 실천불안 완화 전략 실천불안 완화 전략 실천'},
          { title: '우울', value: 20, maxValue: 100, content: '불안 완화 전략 실천, 자기돌봄 루틴 만들기,불안 완화 전략 실천불안 완화 전략 실천불안 완화 전략 실천불안 완화 전략 실천'},
          { title: '관계', value: 90, maxValue: 100, content: '불안 완화 전략 실천, 자기돌봄 루틴 만들기,불안 완화 전략' },
          { title: '진로', value: 99, maxValue: 100, content: '불안 완화 전략 실천, 자기돌봄 루틴 만들기,불안 완화 전략' }
        ],
        adviseItems: [
          {
            title: '불안 완화 전략 실천',
            content:
              '심호흡, 명상, 운동 등 이완 기법을 일상에 도입해보세요. 반복되는 걱정이나 긴장 상황을 적어보고 인지적 재해석을 해보는 것도 도움이 됩니다심호흡, 명상, 운동 등 이완 기법을 일상에 도입해보세요. 반복되는 걱정이나 긴장 상황을 적어보고 인지적 재해석을 해보는 것도 도움이 됩니다.심호흡, 명상, 운동 등 이완 기법을 일상에 도입해보세요. 반복되는 걱정이나 긴장 상황을 적어보고 인지적 재해석을 해보는 것도 도움이 됩니다심호흡, 명상, 운동 등 이완 기법을 일상에 도입해보세요. 반복되는 걱정이나 긴장 상황을 적어보고 인지적 재해석을 해보는 것도 도움이 됩니다.'
          }
        ]
      };

    return (
        <Wrapper>
            <TopBar />
            <Line>비플라이 님의 분석리포트</Line>
            <Report reportData={mockReportData} />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1440px;
    margin: 0 auto;
    background-color: ${theme.colors.other.white};
    padding-bottom: 110px;
`;

const Line = styled.div`
    width: 100%;
    height: 66px;
    background-color: ${theme.colors.green.main};
    display: flex;
    align-items: center;
    font-size: ${theme.fontSize.xl};
    font-weight: ${theme.fontWeight.bold};
    padding-left: 220px;
    color: ${theme.colors.other.white};
`;
