import { ThemeType } from '@ant-design/icons-angular';

export interface BreadcrumbItem {
    label?: string;
    ariaLabel: string;
    icon?: string;
    iconTheme?: ThemeType;
    path?: string;
}
