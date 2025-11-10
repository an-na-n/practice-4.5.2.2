import React from "react";
import { RouterProvider } from "react-router-dom";
import { Container } from "@mantine/core";
import "@mantine/core/styles.css";
import { Header } from "./components/header/Header";
import { router } from "./router";
import classes from "./App.module.css";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container className={classes.container} mt="md">
        <RouterProvider router={router} />
      </Container>
    </>
  );
};

export default App;
