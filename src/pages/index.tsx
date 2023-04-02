import Head from "next/head";
import { Inter } from 'next/font/google'

import {
  NextUIProvider,
  Button,
  Container,
  Row,
  Text,
  Input,
  Grid,
  Image,
} from "@nextui-org/react";

import { apiGetReceip } from "../application/apiGetReceip";
import { useState } from "react";
import { Receip } from "./components/receip";

const mainFont = Inter({ weight: ["400"], subsets: ["latin"] })

export default function Home() {
  const [status, setStatus] = useState("");
  const [receip, setReceip] = useState("");
  const [ingredients, setIngredients] = useState("");

  const createReceip = () => {
    setStatus("loading");
    apiGetReceip(ingredients).then((data) => {
      setStatus("done");
      setReceip(data);
    });
  };

  const changeIngredients = (event: any) => {
    setIngredients(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Recetas</title>
        <meta name="description" content="Recetas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={mainFont.className}>
        <NextUIProvider>
          <Image
            width="100%"
            height={300}
            src="hero.jpg"
            alt="Hero Image"
            objectFit="cover"
          ></Image>
          <Container
            display="flex"
            css={{ minHeight: "100%", maxWidth: "80%" }}
          >
            <Row justify="flex-start" align="center" css={{'flex-direction': "column"}}>
              <Text h1 size={50} css={{ 'padding-top': "5rem", 'padding-bottom': "2rem" }}>
                Añadir ingredientes para la receta
              </Text>
              <Grid.Container
                gap={1}
                justify="center"
                css={{
                  "padding-left": "1.5rem",
                  width: "60%",
                }}
              >
                <Grid css={{ width: "70%" }}>
                  <Input
                    placeholder="Ingredientes"
                    css={{ width: "100%" }}
                    onChange={changeIngredients}
                  ></Input>
                </Grid>
                <Grid css={{ width: "30%" }}>
                  <Button onClick={createReceip} css={{ width: "100%" }}>
                    Crear receta
                  </Button>
                </Grid>
              </Grid.Container> 
              <Receip receip={receip} status={status} />
            </Row>
          </Container>
        </NextUIProvider>
      </main>
    </>
  );
}
