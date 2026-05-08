import {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from 'react';
import type { ReactNode } from 'react';
import type { Pet } from '../types/Pet';

// ---------------------------------------------------------------------------
// State & Actions
// ---------------------------------------------------------------------------

interface SelectionState {
  /** Set of selected pet IDs */
  selectedIds: Set<string>;
}

type SelectionAction =
  | { type: 'TOGGLE'; id: string }
  | { type: 'SELECT_ALL'; ids: string[] }
  | { type: 'CLEAR' };

function selectionReducer(
  state: SelectionState,
  action: SelectionAction
): SelectionState {
  switch (action.type) {
    case 'TOGGLE': {
      const next = new Set(state.selectedIds);
      if (next.has(action.id)) next.delete(action.id);
      else next.add(action.id);
      return { selectedIds: next };
    }
    case 'SELECT_ALL':
      return { selectedIds: new Set(action.ids) };
    case 'CLEAR':
      return { selectedIds: new Set() };
    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface SelectionContextValue {
  selectedIds: Set<string>;
  toggle: (id: string) => void;
  selectAll: (pets: Pet[]) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
  count: number;
  totalSize: (pets: Pet[]) => number;
}

const SelectionContext = createContext<SelectionContextValue | null>(null);

const STORAGE_KEY = 'pet-gallery-selection';

function loadFromStorage(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function saveToStorage(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)));
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(selectionReducer, undefined, () => ({
    selectedIds: loadFromStorage(),
  }));

  // Persist selection to localStorage whenever it changes
  useEffect(() => {
    saveToStorage(state.selectedIds);
  }, [state.selectedIds]);

  const toggle = (id: string) => dispatch({ type: 'TOGGLE', id });
  const selectAll = (pets: Pet[]) =>
    dispatch({ type: 'SELECT_ALL', ids: pets.map((p) => p.id) });
  const clear = () => dispatch({ type: 'CLEAR' });
  const isSelected = (id: string) => state.selectedIds.has(id);
  const count = state.selectedIds.size;

  const totalSize = (pets: Pet[]) =>
    pets
      .filter((p) => state.selectedIds.has(p.id))
      .reduce((sum, p) => sum + p.fileSize, 0);

  return (
    <SelectionContext.Provider
      value={{ selectedIds: state.selectedIds, toggle, selectAll, clear, isSelected, count, totalSize }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useSelection(): SelectionContextValue {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error('useSelection must be used inside SelectionProvider');
  return ctx;
}
