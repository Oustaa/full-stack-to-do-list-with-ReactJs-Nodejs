import React from "react";

const Header = () => {
  return (
    <header>
      <form role="form" action="">
        <h1 role="heading">Add new task</h1>
        <input type="text" name="title" placeholder="Enter Task title..." />
      </form>
    </header>
  );
};

export default Header;
