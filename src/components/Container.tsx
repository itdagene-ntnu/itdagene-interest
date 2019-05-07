import React from "react";
import "./Container.css";

interface Props {
  title: string;
  children?: JSX.Element[] | JSX.Element | string;
}

const Container = (props: Props) => {
  return (
    <div className="box shadow">
      <h1 className="title">{props.title}</h1>
      {props.children}
    </div>
  );
};

export default Container;
