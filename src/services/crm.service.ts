import { api } from '@/lib/axios';
import { Client, Project, Proposal, Invoice, Payment } from '@/types/crm';

export const crmService = {
  // Seed data
  seedData: async (data: any) => {
    const response = await api.post('/seed', data);
    return response.data;
  },

  // Clients
  getClients: async (businessMode: string): Promise<Client[]> => {
    const response = await api.get('/clients', { params: { businessMode } });
    return response.data;
  },
  createClient: async (clientData: any): Promise<Client> => {
    const response = await api.post('/clients', clientData);
    return response.data;
  },

  // Projects
  getProjects: async (businessMode: string): Promise<Project[]> => {
    const response = await api.get('/projects', { params: { businessMode } });
    return response.data;
  },
  createProject: async (projectData: any): Promise<Project> => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  // Proposals
  getProposals: async (businessMode: string): Promise<Proposal[]> => {
    const response = await api.get('/proposals', { params: { businessMode } });
    return response.data;
  },
  createProposal: async (proposalData: any): Promise<Proposal> => {
    const response = await api.post('/proposals', proposalData);
    return response.data;
  },

  // Invoices
  getInvoices: async (businessMode: string): Promise<Invoice[]> => {
    const response = await api.get('/invoices', { params: { businessMode } });
    return response.data;
  },
  createInvoice: async (invoiceData: any): Promise<Invoice> => {
    const response = await api.post('/invoices', invoiceData);
    return response.data;
  },

  // Payments
  getPayments: async (businessMode: string): Promise<Payment[]> => {
    const response = await api.get('/payments', { params: { businessMode } });
    return response.data;
  },
  createPayment: async (paymentData: any): Promise<Payment> => {
    const response = await api.post('/payments', paymentData);
    return response.data;
  },
};
