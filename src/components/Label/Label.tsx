import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

interface LabelProps {
  text?: string;
  variant?: 'primary' | 'secondary' | 'normal';
  color?: string;
}

const Label: React.FC<LabelProps> = ({ text, variant = 'secondary', color: customColor }) => {
  const { color } = useContext(ThemeContext);

  let labelColor: string;
  if (customColor) {
    labelColor = customColor;
  } else {
    if (variant === 'primary') {
      labelColor = color.primary.main;
    } else if (variant === 'secondary') {
      labelColor = '#121212';
    } else if (variant === 'normal') {
      labelColor = '#121212';
    }
  }
  return <StyledLabel color={labelColor}>{text}</StyledLabel>;
};

interface StyledLabelProps {
  color: string;
}

const StyledLabel = styled.div<StyledLabelProps>`
  color: ${(props) => props.color};
  text-align: center;
`;

export default Label;
