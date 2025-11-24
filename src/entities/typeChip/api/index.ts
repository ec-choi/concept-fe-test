import type { TypeChip } from '@/entities/typeChip/model/types';
import { http } from '@/shared/api';

export const typeChipApi = {
  getTypes: async (searchParams: { gradeKey: string }) => {
    return await http.get<TypeChip[]>('/typeChips', { searchParams });
  },
};
