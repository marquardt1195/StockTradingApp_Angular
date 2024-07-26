import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenPositionsComponent } from './nav-menu/open-positions/open-positions.component'
import { TradesComponent } from './nav-menu/trades/trades.component'
import { AccountComponent } from './nav-menu/account/account.component';
import { AnalyticsComponent } from './nav-menu/analytics/analytics.component';

const routes: Routes = [
  { path: 'account', component: AccountComponent },
  { path: 'positions', component: OpenPositionsComponent },
  { path: 'analytics', component: AnalyticsComponent},
  { path: 'trades', component: TradesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
