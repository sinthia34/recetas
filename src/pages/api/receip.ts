// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const ask = `Quiero que actues como un cocinero.
Yo te dare de ingredientes ${req.query.ingredients}.
Tu me daras una receta.`
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: ask }],
      temperature: 0.7,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
      },
    }
  );
  if (response.data.choices.length > 0) {
    const receip = response.data.choices[0].message.content as string
    res.status(200).json({ name: receip });
    return
  }

  const resp = { name: 'No tengo la respuesta por momento. Intente más tarde.' }
  res.status(200).json(resp);  
}
