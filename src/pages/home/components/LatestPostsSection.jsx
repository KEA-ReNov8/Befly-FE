import React from 'react';
import styled from 'styled-components';
import PostCard from '../../../shared/ui/PostCard';

const SectionContainer = styled.div`
  width: 1120px;
  height: 420px;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0 auto 20px auto;
  padding: 0 32px;
`;

const SectionTitle = styled.h2`
  color: #21c5a7;
  font-size: 20px;
  font-weight: bold;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  color: #21c5a7;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const CardsRow = styled.div`
  width: 100%;
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  padding: 0 32px;
  min-height: 340px;
`;

export const LatestPostsSection = ({ title, type, posts, onMore, bg }) => {
  return (
    <SectionContainer style={{ background: bg }}>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        <MoreButton onClick={onMore}>
          더보기 <span style={{ marginLeft: 4 }}>&#8250;</span>
        </MoreButton>
      </SectionHeader>
      <CardsRow>
        {posts.slice(0, 4).map((post) => (
          <PostCard key={post.postId} {...post} type={type} />
        ))}
      </CardsRow>
    </SectionContainer>
  );
};
