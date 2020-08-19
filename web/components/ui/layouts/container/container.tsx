import React from "react";
import Center from "../center";

const Container: React.FC = ({ children }) => {
  return (
    <Center gutters="3" max="80rem">
      {children}
    </Center>
  );
};

export default Container;
