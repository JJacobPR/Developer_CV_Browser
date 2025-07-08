export type Tab = {
  label: string;
  value: string;
};

export type TabMenuProps = {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (value: string) => void;
  className?: string;
};
