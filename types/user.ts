export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  timezone: string;
  currency: string;
  occupation: string;
  memberSince: string;
  planId: string;
  avatar: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  detail: string;
  date: string;
  icon: string;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  date: string;
  kind: 'bill' | 'budget' | 'goal' | 'insight';
  read: boolean;
  href: string;
}
