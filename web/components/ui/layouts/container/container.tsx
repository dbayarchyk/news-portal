import React from "react";
import Center from "../center";

const Container: React.FC = ({ children }) => {
  return (
    <Center gutters="3" max="70rem">
      {children}
    </Center>
  );
};

export default Container;
