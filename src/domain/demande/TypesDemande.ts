export const typesDemandes = ['réclamation', 'récupération-de-points'] as const;
export type TypeDemande = typeof typesDemandes[number];
