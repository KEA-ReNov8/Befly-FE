import React from 'react';
import styled from 'styled-components';
import PostCard from '@shared/ui/PostCard';

export const LatestPosts = ({ title, type, posts, onMore, bg }) => {
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

const SectionContainer = styled.div`
  width: 1120px;
  height: 420px;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0 auto 20px auto;
`;

const SectionTitle = styled.h2`
  color: #21c5a7;
  font-size: 24px;
  font-weight: bold;
`;
const MoreButton = styled.button`
  background: none;
  border: none;
  color: #21c5a7;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 30px;
`;

const CardsRow = styled.div`
  width: 1044px;
  height: 330px;
  display: flex;
  gap: 28px;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  padding: 0 32px;
  min-height: 340px;
`;
