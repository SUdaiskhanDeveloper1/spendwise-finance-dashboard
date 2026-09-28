export interface Budget { id: string; category: string; limit: number; spent: number; period: string; status: 'Healthy' | 'Warning' | 'Over Budget'; color: string; icon: string; }
