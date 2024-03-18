import React from 'react';
import styled from 'styled-components';

const SortingButton = styled.button`
  // 스타일 정의
`;

// SortButtons 컴포넌트 정의
const SortButtons = ({ sortOption, onSortChange }) => {
  return (
    <div>
      <SortingButton
        isActive={sortOption === 'whole'}
        onClick={() => onSortChange('whole')}>
        전체
      </SortingButton>
      <SortingButton
        isActive={sortOption === 'downtown'}
        onClick={() => onSortChange('downtown')}>
        우리동네
      </SortingButton>
      <SortingButton
        isActive={sortOption === 'participants'}
        onClick={() => onSortChange('participants')}>
        인원순
      </SortingButton>
    </div>
  );
};

export default SortButtons;
