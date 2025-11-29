export interface GenericOption<Type, Icon = undefined> {
  id: Type;
  label: string;
  icon?: Icon;
}
