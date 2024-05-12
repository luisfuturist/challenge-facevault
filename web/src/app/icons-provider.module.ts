import {
    ArrowLeftOutline,
    FilterFill,
    HomeFill,
    HomeOutline,
    IdcardFill,
    PlusOutline,
    QuestionOutline,
    UserOutline
} from '@ant-design/icons-angular/icons';

import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

const icons = [IdcardFill, FilterFill, PlusOutline, ArrowLeftOutline, HomeOutline, UserOutline, QuestionOutline];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class IconsProviderModule {}
