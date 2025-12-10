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


app.get("/inventory", async (req, res) => {
  try {
    const filePathChips = path.join(__dirname, "../src/assets/chips.json");
    const filePathCellPhones = path.join(__dirname, "../src/assets/cellphones.json");
    const filePathNotebooks = path.join(__dirname, "../src/assets/notebooks.json");

    const dataChips = await fs.readFile(filePathChips, "utf-8");
    const dataCellPhones = await fs.readFile(filePathCellPhones, "utf-8");
    const dataNotebooks = await fs.readFile(filePathNotebooks, "utf-8");

    const chips = JSON.parse(dataChips);
    const cellPhones = JSON.parse(dataCellPhones);
    const notebooks = JSON.parse(dataNotebooks);

    const inventory: {
      chips: any[];
      cellPhones?: any[];
      notebooks?: any[];
    } = {
      chips: chips,
      cellPhones: cellPhones,
      notebooks: notebooks
    };

    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar JSON' });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
