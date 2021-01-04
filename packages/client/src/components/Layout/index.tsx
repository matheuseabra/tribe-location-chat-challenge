import React from 'react';

import Container from '../Container';
import Header from '../Header';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header>
        <div className="title">
          <h4>Tribe Location Chat</h4>
        </div>
      </Header>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
