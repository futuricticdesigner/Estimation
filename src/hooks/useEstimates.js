import { useContext } from 'react';
import { EstimatesContext } from '@/context/EstimatesContext';

export const useEstimates = () => {
  const ctx = useContext(EstimatesContext);
  if (!ctx) throw new Error('useEstimates must be used inside EstimatesProvider');
  return ctx;
};
