import axios from "axios";
import { getInitialDatasets } from "../src/lib/crm-data";

async function seed() {
  const data = getInitialDatasets();
  const itData = data.it;
  
  try {
    console.log("Seeding IT data...");
    const res = await axios.post("http://localhost:3000/seed", {
      businessMode: "it",
      clients: itData.clients,
      projects: itData.projects,
      proposals: itData.proposals,
      invoices: itData.invoices,
      payments: itData.payments,
    });
    console.log("Seed response:", res.data);
  } catch (error: any) {
    console.error("Error seeding:", error.message);
  }
}

seed();
