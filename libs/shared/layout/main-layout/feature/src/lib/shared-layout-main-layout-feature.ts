import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';
import { TuiNavigation } from '@taiga-ui/layout/components/navigation';
import { SharedLayoutMainHeaderFeature } from '@test-task-insilicobiotech/shared/layout/main-header/feature';

@Component({
  selector: 'lib-shared-layout-main-layout-feature',
  imports: [RouterOutlet, TuiRoot, TuiNavigation, SharedLayoutMainHeaderFeature],
  templateUrl: './shared-layout-main-layout-feature.html',
  styleUrl: './shared-layout-main-layout-feature.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedLayoutMainLayoutFeature {}
