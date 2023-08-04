import styled from 'styled-components';

export const ImageGalleryITEM = styled.li`
  border-radius: 8px;
`;

export const ImageGalleryItemImage = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;

  &:hover {
    transform: scale(1.03);
    cursor: zoom-in;
    filter: drop-shadow(2px 2px 5px black);
  }
`;
