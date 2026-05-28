import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiNavigation } from '@taiga-ui/layout/components/navigation';

@Component({
  selector: 'lib-shared-layout-main-header-feature',
  imports: [TuiNavigation],
  templateUrl: './shared-layout-main-header-feature.html',
  styleUrl: './shared-layout-main-header-feature.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedLayoutMainHeaderFeature {}
