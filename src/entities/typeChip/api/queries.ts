import { typeChipApi } from '@/entities/typeChip/api';
import { queryOptions } from '@tanstack/react-query';

export const typeChipQueries = {
  root: () => ['/typeChips'],
  typeChip: (params: Parameters<typeof typeChipApi.getTypes>[0]) =>
    queryOptions({
      queryKey: [...typeChipQueries.root(), params.gradeKey],
      queryFn: () => typeChipApi.getTypes(params),
    }),
};
