import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiModalModule} from 'ng2-semantic-ui';
import {UciEventsService, UciModule} from '@samagra-x/uci-console';
import {DiscussionTelemetryService} from '../shared/services/discussion-telemetry/discussion-telemetry.service';
import * as _ from 'lodash-es';
import {NavigationHelperService} from '../shared/services';

@NgModule({
  imports: [
    CommonModule,
    SuiModalModule,
    UciModule
  ],
  exports: [UciModule],
  declarations: [],
  providers: []
})
export class UciConsoleModule {
  constructor(
    private uciEvents: UciEventsService,
    private discussionTelemetryService: DiscussionTelemetryService,
    private navigationHelperService: NavigationHelperService) {
    this.uciEvents.telemetryEvent.subscribe(event => {
      this.discussionTelemetryService.logTelemetryEvent(event);
      if (_.get(event, 'action') === 'DF_CLOSE') {
        this.navigationHelperService.navigateToLastUrl();
      }
    });
  }
}
