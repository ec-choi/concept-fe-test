// import { createContentStore } from '@/pages/Achievement/store/contentStore';
import { createFilterStore } from '@/pages/Achievement/store/filterStore';
import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';
import type { ExtractState } from 'zustand';
import { useStore } from 'zustand';

type AchievementContextValue = {
  filterStore: ReturnType<typeof createFilterStore>;
  // contentStore: ReturnType<typeof createContentStore>;
};

const AchievementContext = createContext<AchievementContextValue | null>(null);

export const AchievementProvider = ({
  initialGradeKey,
  children,
}: {
  initialGradeKey: Parameters<typeof createFilterStore>[0]['initialGradeKey'];
  children: ReactNode;
}) => {
  const _filterStore = useMemo(
    () => createFilterStore({ initialGradeKey }),
    [initialGradeKey],
  );

  return (
    <AchievementContext
      value={{
        filterStore: _filterStore,
      }}
    >
      {children}
    </AchievementContext>
  );
};

export const useFilterStore = <U,>(
  selector: (state: ExtractState<ReturnType<typeof createFilterStore>>) => U,
) => {
  const filterStore = useContext(AchievementContext)?.filterStore;
  if (!filterStore) {
    throw new Error('filterStore is not found');
  }
  return useStore(filterStore, selector);
};

// export const useContentStore = <U,>(
//   selector: (state: ExtractState<ReturnType<typeof createContentStore>>) => U,
// ) => {
//   const contentStore = useContext(AchievementContext)?.contentStore;
//   if (!contentStore) {
//     throw new Error('contentStore is not found');
//   }
//   return useStore(contentStore, selector);
// };
