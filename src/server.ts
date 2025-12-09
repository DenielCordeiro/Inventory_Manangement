import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

// Corrigir __dirname no modo ESM
const __filename = fileURLToPath(import.meta.url); // Obtém o nome do arquivo atual
const __dirname = path.dirname(__filename); // Obtém o diretório do arquivo atual

const app = express(); // Cria uma aplicação Express
app.use(express.json()); // Middleware para parsear JSON

// Servir arquivos do front
app.use(express.static(path.join(__dirname, "../public"))); // Serve arquivos estáticos da pasta public
app.use("/dist", express.static(path.join(__dirname, "../dist"))); // Serve arquivos estáticos da pasta dist


app.get("/chips", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../src/assets/cellphones.json");
    const data = await fs.readFile(filePath, "utf-8");
    const cellphones = JSON.parse(data);

    res.json(cellphones);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar JSON' });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
