import type { TypeChip } from '@/entities/typeChip/model/types';
import { http } from '@/shared/lib/http';

export const typeChipApi = {
  getTypes: async (searchParams: { gradeKey: string }) => {
    return await http.get<TypeChip[]>('/typeChips', { searchParams });
  },
};
