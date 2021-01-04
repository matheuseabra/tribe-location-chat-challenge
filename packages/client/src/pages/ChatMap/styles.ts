import styled from 'styled-components';

export const AvatarCircle = styled.div`
  width: 36px;
  height: 36px;
  color: #fff;
  background: #ccc;
  border: none;
  font-size: 28px;
  border-radius: 50%;
`;

export const InputContainer = styled.div`
  max-width: 750px;
  width: calc(100% - 24px);
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 8px 16px;
  background: #fff;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  textarea {
    height: 50px;
    font-size: 14px;
    color: #222;
    flex: 1;
    background: transparent;
    border: none;
    &::placeholder {
      color: #444;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    width: 42px;
    height: 42px;
    color: #fff;
    background: #8d67dd;
    border: none;
    font-size: 28px;
    border-radius: 50%;
    margin-left: 8px;
  }
`;
