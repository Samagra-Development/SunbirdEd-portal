import { DiscussionService } from './services/discussion/discussion.service';
import { SuiModalModule } from 'ng2-semantic-ui';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscussionRoutingModule } from './discussion-routing.module';
import { ForumComponent } from './components/forum/forum.component';
import { UciModule, UciEventsService } from '@samagra-x/uci-console';
import { DiscussionTelemetryService } from '../shared/services/discussion-telemetry/discussion-telemetry.service';
import * as _ from 'lodash-es';
import { NavigationHelperService } from '@sunbird/shared';
import { AccessDiscussionComponent } from './components/access-discussion/access-discussion.component';

@NgModule({
  imports: [
    CommonModule,
    SuiModalModule,
    UciModule
  ],
  exports: [ UciModule , AccessDiscussionComponent],
  declarations: [ ForumComponent, AccessDiscussionComponent ],
  providers: [ DiscussionService ]
})
export class UciConsoleModule {
  constructor(
    private uciEvents: UciEventsService,
    private discussionTelemetryService: DiscussionTelemetryService,
    private navigationHelperService: NavigationHelperService) {
    this.uciEvents.telemetryEvent.subscribe(event => {
      this.discussionTelemetryService.logTelemetryEvent(event);
      if (_.get(event, 'action') === 'DF_CLOSE' ) {
        this.navigationHelperService.navigateToLastUrl();
      }
    });
  }
}
